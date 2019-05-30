const dao = require('./notifications.dao');

//Notify users
const addNotificationsForUserId = (userId, notificationNotes) => {
  return dao.addNotificationsForUserId(userId, notificationNotes);
};

//Get reminders
const getReminders = (userId) => {
  return dao.getNotificationsForSelf(userId);
};

//Add reminder
const addReminder = (userId, notification) => {
  return dao.addSelfNotifications(userId, notification);
};

//Snooze reminder
const snoozeReminder = (notificationId, notification) => {
  return dao.updateReminderForNotificationId(notificationId, notification);
};

//Dismiss reminder
const dismissReminder = (notificationId) => {
  return dao.deleteReminderForNotificationId(notificationId);
};

//Get reminder
const getReminder = (notificationId) => {
  return dao.getReminderForNotificationId(notificationId);
}

module.exports = {
  addNotificationsForUserId,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder,
  getReminder
};