const Deckbuilder = require('deckbuilder');
const { response } = require('express');
const router = require('express').Router();
const { Cat } = require('../../models');
const cardPool = require("../../seeds/mockCardData.js")

const deckbuilder = new Deckbuilder({ maxDeckSize: 10 });

router.get('/', async (req, res) => {
  try {
    const cards = deckbuilder.drawn
    const catData = await Cat.findAll();

    const cats = catData.map((cat) =>
      cat.get({ plain: true })
    );


    res.render('homepage', {
      cards, 
      cats, 
      gameHasStarted: req.session.gameHasStarted, 
      maxCardsInHand: deckbuilder.drawn.length === 5, 
      oneCardHand: deckbuilder.drawn.length === 1 ? false : true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/start', async (req, res) => {
  try {
    const catData = await Cat.findAll();

    const cats = catData.map((cat) =>
      cat.get({ plain: true })
    );

    // create starting game hand to player
    deckbuilder.add(cardPool)
    deckbuilder.shuffle(2);
    deckbuilder.deal(1, 5)// 5 cards to 1 player

    const cards = deckbuilder['1']

    req.session.save(() => {
      req.session.catHealth = cats[0].health
      req.session.gameHasStarted = true;
    })

    res.render('homepage', {
      cards, 
      cats, 
      gameHasStarted: req.session.gameHasStarted
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/play/:id', async (req, res) => {
  try {
    let cardId = req.params.id;
    await deckbuilder.discard(parseInt(cardId))
    await deckbuilder.draw(1)
    
    const updatedHealth = parseInt(req.session.catHealth) + parseInt(req.body.actionEffect)

    req.session.save(() => {
      req.session.catHealth = updatedHealth
    })

    // update catHealth to account for this turn's card action effect
    await Cat.update( 
      { health: updatedHealth },
      {
      where: {
        id: 1
      }
    })

    res.status(200).json({ message: 'Card has successfully been played and taken out of player hand.' })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/discard', async (req, res) => {
  try {
    const amountToDraw = req.body.toDiscard.length
    await deckbuilder.discard(req.body.toDiscard)
    deckbuilder.draw(amountToDraw)
    res.status(200).json({ message: 'Card has successfully been discarded.'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/draw', async (req, res) => {
  try {
    await deckbuilder.draw(1)
    res.status(200).json({ message: 'Card has successfully been drawn.'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;