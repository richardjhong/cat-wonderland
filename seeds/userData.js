const { User } = require('../models');

const userData = [
  {
    username: 'UserA',
    password: 'password12345',
    email: 'user1@email.com'
  },
  {
    username: 'UserB',
    password: 'password22345',
    email: 'user2@email.com'
  },
  {
    username: 'UserC',
    password: 'password22245',
    email: 'user3@email.com'
  },
];

const seedUsers = async () => await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
