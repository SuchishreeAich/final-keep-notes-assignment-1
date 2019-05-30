const notificationsService = require('./notifications.service');

//Notify users
const addNotificationsForUserId = (userId,notificationWithNotes) => { 
    return notificationsService.addNotificationsForUserId(userId,notificationWithNotes);
}

//Get reminders
const getReminders = (userId) => {
    return notificationsService.getReminders(userId);
}

//Add reminder
const addReminder = (userId, notification) => {
    return notificationsService.addReminder(userId,notification);
}

//Snooze reminder
const snoozeReminder = (notificationId, notification) => {
  return notificationsService.snoozeReminder(notificationId,notification);
}

//Dismiss reminder
const dismissReminder = (notificationId) => {
  return notificationsService.dismissReminder(notificationId);
}

//Get reminder
const getReminder = (notificationId) => {
  return notificationsService.getReminder(notificationId);
}

module.exports = {
  addNotificationsForUserId,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder,
  getReminder
}