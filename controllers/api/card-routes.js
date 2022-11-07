const Deckbuilder = require('deckbuilder');
const router = require('express').Router();
const { Card } = require('../../models');

const deckbuilder = new Deckbuilder({ maxDeckSize: 1 });

router.get('/', async (req, res) => {
  try {
    const dbCardDeckData = await Card.findAll();
    const cardPool = dbCardDeckData.map((card) =>
      card.get({ plain: true })
    );
    deckbuilder.add(cardPool)
    deckbuilder.shuffle(2);
    const cards = deckbuilder.deal(1, 2)['1'] // 1 card to 1 player
    res.render('homepage', {
      cards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;