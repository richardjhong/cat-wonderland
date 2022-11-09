const Deckbuilder = require('deckbuilder');
const router = require('express').Router();
const { Card, Cat } = require('../../models');
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
      cards, cats, gameHasStarted: req.session.gameHasStarted
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

    deckbuilder.add(cardPool)
    deckbuilder.shuffle(2);
    deckbuilder.deal(1, 5)// 5 cards to 1 player

    const cards = deckbuilder['1']

    req.session.save(() => {
      req.session.catHealth = cats[0].health
      req.session.gameHasStarted = true;
    })

    res.render('homepage', {
      cards, cats, gameHasStarted: req.session.gameHasStarted
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    let cardId = req.params.id;
    await deckbuilder.discard(parseInt(cardId))
    
    const updatedHealth = parseInt(req.session.catHealth) + parseInt(req.body.actionEffect)

    req.session.save(() => {
      req.session.catHealth = updatedHealth
    })

    const updatedCatData = await Cat.update(
      { health: updatedHealth },
      {
      where: {
        id: 1
      }
    })

    const cards = deckbuilder.drawn

    // res.render('homepage', {
    //   cards, updatedCatData
    // });
    res.status(200).json({ message: 'Card has successfully been played and taken out of player hand' })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;