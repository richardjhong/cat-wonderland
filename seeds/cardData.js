const { Card } = require('../models');

const cardData = [
  {
    name: 'Restock cat food',
    description: 'Restocked cat food for 3 days!',
    actionEffect: 5,
    user_id: 1
  },
];

const seedCards = async () => await Card.bulkCreate(cardData)

module.exports = seedCards;
