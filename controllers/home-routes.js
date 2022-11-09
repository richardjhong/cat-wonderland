const router = require('express').Router();
const { Card } = require('../models');


router.get('/', async (req, res) => {
  try {
    const dbCardDeckData = await Card.findAll();

    const cards = dbCardDeckData.map((card) =>
      card.get({ plain: true })
    );

    console.log('cards: ', cards)
    res.render('homepage', {
      cards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;