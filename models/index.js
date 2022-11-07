const User = require('./User');
const Cat = require('./Cat');
const Card = require('./Card');
const Meter = require('./Meter');

User.hasMany(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Card.belongsTo(User, {
  foreignKey: 'user_id',
});

Cat.hasMany(Meter, {
  foreignKey: 'cat_id',
  onDelete: 'CASCADE'
});

Meter.belongsTo(Cat, {
  foreignKey: 'cat_id',
});

User.hasOne(Cat, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Cat.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = { User, Cat, Card, Meter };
