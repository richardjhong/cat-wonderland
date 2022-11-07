const sequelize = require('../config/connection');
const seedMeters = require('./meterData');
const seedCats = require('./catData');
const seedUsers = require('./userData');
const seedCards = require('./cardData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();
  await seedCats();
  await seedMeters();
  await seedCards();

  process.exit(0);
};

seedAll();
