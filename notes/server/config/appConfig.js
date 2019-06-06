// write your application configration here
const serverConfig = {
    port : 4002,
    sleepDuration: 10000
}

const dbConfig = {
    mongoUrl : process.env.MONGO_URL || 'mongodb://localhost:27017/keepDB'
}

const authConfig = {
    jwtSecret: 'jwttokenbasedauth'
}

module.exports = {
    serverConfig,
    dbConfig,
    authConfig
}