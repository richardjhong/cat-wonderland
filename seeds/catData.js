const { Cat } = require('../models');

const catData = [
  {
    name: 'Scratchy',
    health: 100,
    user_id: 1
  },
];

const seedCats = async () => await Cat.bulkCreate(catData)

module.exports = seedCats;
