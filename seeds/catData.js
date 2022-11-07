const { Cat } = require('../models');

const catData = [
  {
    name: 'Scratchy',
    user_id: 1
  },
];

const seedCats = async () => await Cat.bulkCreate(catData)

module.exports = seedCats;
