const notificationModule = require('./notifications.entity');
const uuidv1 = require('uuid/v1');

const addNotificationsForUserId = (userId, notificationNotes) => {
    return new Promise((resolve, reject) => {

        let notificationsToAdd = notificationNotes.notes.map(n => {

            return new notificationModule({
                notificationId: uuidv1(),
                userId: userId,
                username: notificationNotes.username,
                isReminded: false,
                remindAt: new Date(),
                self: false,
                note: n,
                edittype: notificationNotes.edittype
            });
        });

        notificationModule.insertMany(notificationsToAdd, (error, savedNotifications) => {
            if (error) {
                throw error;
            }
            else {
                resolve({
                    message: "Successfull add notification",
                    status: 201,
                    notifications: savedNotifications
                });
            }
        });
    });
};

const addSelfNotifications = (userId, notification) => {
    return new Promise((resolve, reject) => {

        let notificationToAdd = new notificationModule({
            notificationID: uuidv1(),
            userId: userId,
            userName: notification.userName,
            isReminded: false,
            remindAt: notification.remindAt,
            note: notification.note,
            self: true,
            edittype: notification.edittype
        });

        notificationToAdd.save((error, data) => {

            if (error) {
                reject({ message: 'Internal server error', status: 500 });
            }
            else {
                resolve({ message: "Successfull add notification", status: 200, notifications: data });
            }
        });
    });
};

const getNotificationsForSelf = (userId) => {
    return new Promise((resolve, reject) => {

        notificationModule.find({ 'userId': userId }, function (err, data) {

            if (err) {
                reject({ message: 'Internal server error', status: 500 });
            }
            else if (!data) {
                reject({ message: 'No notifications found for this userId', status: 200 });
            }
            else {
                resolve({ message: "Successfull note fetch", status: 200, notifications: data });
            }
        });

    });
};

const updateReminderForNotificationId = (notificationId, notification) => {

    return new Promise((resolve, reject) => {

        let updateData = {
            remindAt: notification.remindAt,
            isSent: false
        }

        notificationModule.findOneAndUpdate({ 'notificationId': notificationId }, updateData,
            { new: true }, (error, updatedNotification) => {

                if (error) {
                    throw error;
                }
                else {
                    resolve({ message: "Successfull notification update", status: 200, notifications: updatedNotification });
                }
            });
    });
};

const deleteReminderForNotificationId = (notificationId) => {
    return new Promise((resolve, reject) => {

        notificationModule.deleteOne({ 'notificationId': notificationId }, (error) => {

            if (error) {
                throw error;
            }
            else {
                resolve({ message: "Successfull notification delete", status: 200 });
            }
        });
    });
};

const markNotificationSentForNotificationId = (notificationId) => {
    return new Promise((resolve, reject) => {

        const updateData = {
            isSent: true
        };

        notificationModule.findOneAndUpdate({ 'notificationId': notificationId },
            updateData, { new: true }, (error, updatedNotification) => {

                if (error) {
                    throw error;
                }
                else {
                    resolve({
                        message: "Successfull notification update", status: 200,
                        notifications: updatedNotification
                    });
                }
            });
    });
};

const getAllNotificationsToProcess = (callback) => {
    notificationModule.find()
        .exec(callback);
};

const getReminderForNotificationId = (notificationId) => {

    return new Promise((resolve, reject) => {

        notificationModule.find({ 'notificationId': notificationId }, function (err, data) {

            if (err) {
                throw err;
            }
            else {
                resolve({ message: "Successfull notification fetch", status: 200, notification: data });
            }
        });
    });
};

module.exports = {
    addNotificationsForUserId,
    addSelfNotifications,
    getNotificationsForSelf,
    updateReminderForNotificationId,
    deleteReminderForNotificationId,
    markNotificationSentForNotificationId,
    getAllNotificationsToProcess,
    getReminderForNotificationId
}