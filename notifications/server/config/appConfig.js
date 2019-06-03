// write your application configration here
const serverConfig = {
    port : 4003,
    hostname : '127.0.0.1',
    sleepDuration: 10000
}

const dbConfig = {
    mongoUrl : 'mongodb://localhost:27017/keepDB'
}

const authConfig = {
    jwtSecret: 'jwttokenbasedauth'
}

module.exports = {
    serverConfig,
    dbConfig,
    authConfig
}