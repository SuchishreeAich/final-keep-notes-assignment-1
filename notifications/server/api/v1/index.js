const router = require('express').Router();

//write your routes here
router.use('/notifications',require('./notifications'));

module.exports = router;