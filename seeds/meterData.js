const { Meter } = require('../models');

const meterData = [
  {
    title: 'Hunger',
    gauge: 100,
    cat_id: 1
  },
];

const seedMeters = async () => await Meter.bulkCreate(meterData)

module.exports = seedMeters;
