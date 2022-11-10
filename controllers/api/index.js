const router = require('express').Router();
const cardRoutes = require('./card-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

router.use('/cards', cardRoutes);

module.exports = router;
