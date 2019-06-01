const NotificationModel = require('./notifications.entity');
const uuidv1 = require('uuid/v1');

//Adds notification with self=false for the userID passed.
const addNotificationsForUserID = (userId, notificationNotes) => {
  return new Promise((resolve, reject) => {

    try {
      const notificationsToAdd = notificationNotes.notes.map(n => {
        return new NotificationModel({
          notificationID: uuidv1(),
          userId: userId,
          userName: notificationNotes.userName,
          isReminded: false,
          remindAt: new Date().toISOString(),
          self: false,
          note: n,
          edittype: notificationNotes.edittype
        });
      });

      NotificationModel.insertMany(notificationsToAdd, (err, savedNotifications) => {
        if (err) throw err;

        resolve({
          message: 'notifications added to share',
          status: 201,
          notifications: savedNotifications
        });

      });
    } catch (error) {
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

//Adds notification with self=true for the userID passed.
const addSelfNotifications = (userId, notification) => {
  return new Promise((resolve, reject) => {

    try {
      const notificationToAdd = new NotificationModel({
        notificationID: uuidv1(),
        userId: userId,
        userName: notification.userName,
        isReminded: false,
        remindAt: notification.remindAt,
        note: notification.note,
        self: true
      });

      notificationToAdd.save((err, savedNotification) => {
        if (err) throw err;
        resolve({
          message: 'notification added',
          status: 201,
          notification: savedNotification
        });

      });
    } catch (error) {
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

const getNotificationsForSelf = (userId) => {
  console.log('getNotificationsForSelf 1');
  return new Promise((resolve, reject) => {

    try {
      const query = {
        userId: userId
      };

      NotificationModel.find(query, (err, notificationsInDb) => {
        if (err) throw err;
        const notifications = notificationsInDb.filter(n => n.self);

        resolve({
          message: 'notification found',
          status: 200,
          notifications: notifications
        });

      });
    } catch (error) {
      reject({ message: 'Failed to get reminders/notifications  due to internal error', status: 500 });
    }
  });
};

const updateReminderForNotificationID = (notificationId, notification) => {
  return new Promise((resolve, reject) => {

    try {
      const query = {
        notificationID: notificationId
      };

      const updateData = {
        remindAt: notification.remindAt,
        isSent: false
      }

      NotificationModel.findOneAndUpdate(query, updateData, { new: true }, (err, savedNotification) => {
        if (err) throw err;

        resolve({
          message: 'reminder updated',
          status: 200,
          notification: savedNotification
        });

      });
    } catch (error) {
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

const deleteReminderForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {

    try {
      NotificationModel.deleteOne({ notificationID: notificationId }, (err) => {
        if (err) throw err;
        resolve({
          message: 'reminder dismissed',
          status: 200
        });

      });
    } catch (error) {
      reject({ message: 'Failed to delete due to internal error', status: 500 });
    }
  });
};

const markNotificationSentForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {

    try {
      const query = {
        notificationID: notificationId
      };

      const updateData = {
        isSent: true
      };

      NotificationModel.findOneAndUpdate(query, updateData, { new: true }, (err, savedNotification) => {
        if (err) throw err;

        resolve({
          message: 'reminder updated',
          status: 200,
          notification: savedNotification
        });

      });
    } catch (error) {
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

const getAllNotificationsToProcess = (callback) => {
  NotificationModel.find()
    .exec(callback);
};

const getReminderForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {

    try {
      const query = {
        notificationID: notificationId
      };

      NotificationModel.find(query, (err, notifications) => {
        if (err) throw err;

        resolve({
          message: 'notification found',
          status: 200,
          notifications: notifications
        });

      });
    } catch (error) {
      reject({ message: 'Failed to get reminders/notifications  due to internal error', status: 500 });
    }
  });
};

module.exports = {
  addNotificationsForUserID,
  addSelfNotifications,
  getNotificationsForSelf,
  updateReminderForNotificationID,
  deleteReminderForNotificationID,
  markNotificationSentForNotificationID,
  getAllNotificationsToProcess,
  getReminderForNotificationID
}