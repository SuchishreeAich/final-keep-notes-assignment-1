// write your application configration here
let config = {
  "WWW_PORT": process.env.PORT || "7000",
  "NOTES_URL": process.env.NOTES_URL || "http://localhost:4002",
  "USERS_URL": process.env.USER_URL || "http://localhost:4001",
  "NOTIFICATION_URL": process.env.NOTIFICATIONS_URL || "http://localhost:4003",
  "AUTH_URL": process.env.AUTH_URL || "http://localhost:4004"
}


module.exports = config;