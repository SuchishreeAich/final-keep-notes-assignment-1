const router = require('express').Router();
const controller = require('./auth');


//login users


router.post('/', controller.isAuthenticatedUserEndPoint);

module.exports = router;