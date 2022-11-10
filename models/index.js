const User = require('./User');
const Cat = require('./Cat');
const Meter = require('./Meter');

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


module.exports = { User, Cat, Meter };
