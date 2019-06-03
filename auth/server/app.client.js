const appConfig = require('./config').appConfig;
const notificationsDao = require('./api/v1/notifications/notifications.dao');
const socket = require('./api/v1/notifications/socket');
const async = require('async');

const registerSocket = () => {
  async.forever(
    (next) => { //Function to repeated
      processNotifications();
      //Repeat after the delay
      setTimeout(() => { 
        next();
      }, appConfig.serverConfig.sleepDuration)
    },
    (err) => {
    }
  )
}

const processNotifications = () => {

  notificationsDao.getAllNotificationsToProcess((err, notifications) => {
    if(err) {
    }
    
    if (notifications && notifications.length > 0) {
      
      notifications.map(n => {
        if (IsLessThanCurrentTime(n.remindAt) && !n.isSent) {

          const response = socket.sendNotification(n);
          if(response) {
            notificationsDao.markNotificationSentForNotificationID(n.notificationID)
            .then(res => {})
            .catch(err => {});
          }
        } else {
        }
      });
    }
  });
}

const IsLessThanCurrentTime = (remindAt) => {
  return new Date() >= new Date(remindAt);
}

module.exports = {
  registerSocket
};