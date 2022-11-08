const { Card } = require('../models');

const cardData = [
  {
    name: 'Restock cat food',
    description: 'Restocked cat food for 3 days!',
    actionEffect: 5,
    user_id: 1
  },
  {
    name: 'Used polluted water',
    description: `Uh oh, the water filter didn't do its job and the cat is feeling sick now`,
    actionEffect: -5,
    user_id: 1
  },
  {
    name: 'Cat bath',
    description: `Washed the cat; its eyes are full of resentment`,
    actionEffect: -2,
    user_id: 1
  },
];

const seedCards = async () => await Card.bulkCreate(cardData)

module.exports = seedCards;
