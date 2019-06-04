const router = require('express').Router();
const userCtrl = require('./user.controller');


//login users
router.post('/login',(req,res) => {   
    userCtrl.loginUser(req.body).then((response) => {
        res.status(response.status).send(response);
    }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//register users
router.post('/register',(req,res) => {   
    userCtrl.registerUser(req.body).then((response) => {
        res.status(response.status).send(response.user);
    }).catch((error) => {
        res.status(error.status).send(error);
    });
});

//get all registered users
router.get('/',(req,res) =>{   
    userCtrl.getAllRegisteredUsers().then((response) => {
        res.status(response.status).send(response.users);
    }).catch((error) => {
        res.status(error.status).send(error);
    });
});

module.exports = router;