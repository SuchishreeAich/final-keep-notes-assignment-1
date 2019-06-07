//  Test Configuration Object
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const {authConfig} = require('../config/appConfig');

const NOTIFICATION_ID_1 = uuidv1();
const NOTIFICATION_ID_2 = uuidv1();
const NOTIFICATION_ID_3 = uuidv1();

const USER_ID_1 = 'user Id 1';

const NOTE_1 = {
    title: 'note title 1',
    text: 'note text 1'
}

const NOTIFICATION_1={
    userId: 'userId 1',
    userName: 'userName 1',
    note: NOTE_1
}

const NOTIFICATION_2={
    userId: 'userId 2',
    userName: 'userName 2'
}

const payload_USER_1 = {
    userId: 'userId 1',
    userName: 'userName 1'
}

const token_USER_1 = jwt.sign(payload_USER_1,authConfig.jwtSecret);

module.exports = {
    NOTIFICATION_ID_1,
    NOTIFICATION_ID_2,
    NOTIFICATION_1,
    NOTIFICATION_2,
    USER_ID_1,
    token_USER_1,
    payload_USER_1
}

