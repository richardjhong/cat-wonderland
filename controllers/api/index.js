const router = require('express').Router();
const cardRoutes = require('./card-routes');

router.use('/cards', cardRoutes);

module.exports = router;
