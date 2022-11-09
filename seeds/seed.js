const sequelize = require('../config/connection');
const seedMeters = require('./meterData');
const seedCats = require('./catData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedCats();
  await seedMeters();
  process.exit(0);
};

seedAll();
