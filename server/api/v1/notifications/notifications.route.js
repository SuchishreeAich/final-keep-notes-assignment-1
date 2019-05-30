const router = require('express').Router();
const notificationsCtrl = require('./notifications.controller');
const auth = require('../auth');

//control access using authentication
router.use(auth.isAuthenticatedUser);

//Add notifications for User Id
router.post('/:userId', (req,res) => {

    let userId = req.params.userId;
    let notificationWithNotes = req.body;

    notificationsCtrl.addNotificationsForUserId(userId,notificationWithNotes).then((response) => {
      res.status(response.status).send(response.notifications);
   }).catch((error) => {
      res.status(error.status).send(error);
  }); 
});

//Get Reminders by User Id
router.get('/reminders', (req,res) => {
  
  let userId = req.query.userId;
  notificationsCtrl.getReminders(userId).then((response) => {
      res.status(response.status).send(response.notifications);
   }).catch((error) => {
      res.status(error.status).send(error);
  });
  
});

//Add Reminder
router.post('/reminders', (req,res)=>{

    let userId = req.query.userId;
    let notification = req.body;

    notificationsCtrl.addReminder(userId, notification)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });

});

//Get reminder by notification Id
router.get('/reminders/:notificationId', (req,res) => {

    let notificationId = req.params.notificationId;

    notificationsCtrl.getReminder(notificationId)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
});

//Snooze reminder
router.put('/reminders/:notificationId', (req,res)=> {

    let notificationId = req.params.notificationId;
    let notification = req.body;

    notificationsCtrl.snoozeReminder(notificationId, notification)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
});

//Dismiss reminder
router.delete('/reminders/:notificationId', (req,res) => {
    
    let notificationId = req.params.notificationId;

    notificationsCtrl.dismissReminder(notificationId)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
});


module.exports = router;