const router = require('express').Router();
const controller = require('./auth');


//login users

// router.get('/', (req, res) => {
//     res.send('auth is ok');
// });

router.post('/', controller.isAuthenticatedUserEndPoint);

module.exports = router;