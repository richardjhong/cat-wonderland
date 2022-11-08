const Deckbuilder = require('deckbuilder');
const router = require('express').Router();
const { Card, Cat } = require('../../models');

const deckbuilder = new Deckbuilder({ maxDeckSize: 3 });

router.get('/', async (req, res) => {
  try {
    const cards = deckbuilder.deck
    const catData = await Cat.findAll();

    const cats = catData.map((cat) =>
      cat.get({ plain: true })
    );


    res.render('homepage', {
      cards, cats
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/start', async (req, res) => {
  try {
    const dbCardDeckData = await Card.findAll();
    const catData = await Cat.findAll();

    const cardPool = dbCardDeckData.map((card) =>
      card.get({ plain: true })
    );
    const cats = catData.map((cat) =>
      cat.get({ plain: true })
    );

    deckbuilder.add(cardPool)
    deckbuilder.shuffle(2);
    const cards = deckbuilder.deal(1, 2)['1'] // 2 cards to 1 player

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
    console.log("deckbuilder before discard? ", deckbuilder)
    await deckbuilder.discard(cardId)

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

    console.log('current hand?: ', deckbuilder)

    res.render('homepage', {
      deckbuilder, updatedCatData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;