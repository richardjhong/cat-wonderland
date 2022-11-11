const Deckbuilder = require('deckbuilder');
const router = require('express').Router();
const { Cat } = require('../../models');
const cardPool = require("../../seeds/mockCardData.js")
const withAuth = require('../../utils/auth');

const deckbuilder = new Deckbuilder();

router.get('/', async (req, res) => {
  try {
    const cards = deckbuilder.drawn
    const catData = await Cat.findAll();

    const cats = catData.map((cat) =>
      cat.get({ plain: true })
    );

    req.session.save(() => {
      if (req.session.gameHasStarted) {
        req.session.gameTurns = req.session.gameTurns - 1
      }
    })

    console.log('req.session.gameHasStarted? ', req.session.gameHasStarted)

    if (req.session.gameTurns <= 0 || req.session.catHealth <= 0) {
      res.render('gameover')
    } else {
      res.render('homepage', {
        cards, 
        cats, 
        gameHasStarted: req.session.gameHasStarted, 
        maxCardsInHand: deckbuilder.drawn.length === 5, 
        oneCardHand: deckbuilder.drawn.length === 1 ? false : true,
        loggedIn: req.session.loggedIn,
        gameTurns: req.session.gameTurns || false
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/start', async (req, res) => {
  try {

    await Cat.update( 
      { health: 100 },
      {
      where: {
        id: 1
      }
    })

    let cats = await Cat.findOne({ where: { id: 1 }})

    // create starting game hand to player
    deckbuilder.add(cardPool)
    deckbuilder.shuffle(2);
    deckbuilder.deal(1, 5)// 5 cards to 1 player

    const cards = deckbuilder['1']

    let health = cats.dataValues.health

    req.session.save(() => {
      req.session.catHealth = health
      req.session.gameHasStarted = true;
      req.session.gameTurns = 20;
      console.log('unique console log: ', req.session.gameHasStarted)
    })

    setTimeout(() => {
      res.render('homepage', {
        cards, 
        cats, 
        gameHasStarted: req.session.gameHasStarted,
        loggedIn: req.session.loggedIn
      });
    }, "3000")


     
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/play/:id', async (req, res) => {
  try {
    let cardId = req.params.id;
    await deckbuilder.discard(parseInt(cardId))
    if (deckbuilder.deck.length === 0) {
      await deckbuilder.returnDiscarded();
    }
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
    if (deckbuilder.deck.length < 5) {
      await deckbuilder.returnDiscarded();
    }
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