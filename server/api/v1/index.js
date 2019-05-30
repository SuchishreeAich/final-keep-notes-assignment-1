const router = require('express').Router();

//write your routes here
router.use('/users',require('./users'));

router.use('/auth',require('./auth/auth.route'));

router.use('/notes',require('./notes'));

router.use('/notifications',require('./notifications'));

module.exports = router;