const router = require('express').Router();

//write your routes here
router.use('/notes',require('./notes'));

module.exports = router;