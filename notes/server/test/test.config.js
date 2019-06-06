//  Test Configuration Object
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const {authConfig} = require('../config/appConfig');

const USER_ID_1 = uuidv1();
const USER_ID_2 = uuidv1();
const USER_ID_3 = uuidv1();
const NOTE_ID_1 = uuidv1();

const NOTE_1={
    id: NOTE_ID_1,
    title: 'note 1',
    text: 'text 1',
    state: 'started'
}

const NOTE_2={
    title: 'note 2',
    text: 'text 2',
    state: 'completed'
}

const USER_1={
    username: USER_ID_1,
    password: USER_ID_1
};

const USER_2={
    username: USER_ID_2,
    password: USER_ID_2
};

const USER_3={
    username: USER_ID_3,
    password: USER_ID_3
};

const payload_USER_1 = {
    userId : USER_ID_1,
    userName : USER_ID_1
}

const token_USER_1 = jwt.sign(payload_USER_1,authConfig.jwtSecret);

module.exports = {
    USER_ID_1,
    USER_ID_2,
    USER_ID_3,
    NOTE_1,
    NOTE_2,
    USER_1,
    USER_2,
    USER_3,
    token_USER_1,
    payload_USER_1
}

