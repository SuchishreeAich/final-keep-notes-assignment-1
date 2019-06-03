const router = require('express').Router();

//write your routes here
router.use('/auth',require('./auth/auth.route'));

module.exports = router;