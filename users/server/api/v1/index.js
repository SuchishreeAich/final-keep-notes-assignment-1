const router = require('express').Router();

//write your routes here
router.use('/users',require('./users'));

module.exports = router;