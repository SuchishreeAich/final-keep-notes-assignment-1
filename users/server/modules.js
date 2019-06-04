const db = require('./db');
const auth  = require('../server/api/v1/users/auth');
/* Replace undefined with Require of your Mongoose connection initialization method */
const initializeMongooseConnection = () => {
	db.createMongoConnection();
	db.getMongoConnection();
}
/* Replace undefined with Require of your user entity*/
const userModel = require('./api/v1/users/user.entity');
/* Replace undefined with the method or function reference, which signs the token with given payload, expiry time and secret, call back should have error or signed token */
const signJWTToken = auth.signToken;
/* Replace undefined with the method or function reference, which verifies a given JWT Token and callback with error & payload */
const verifyJWTToken = auth.verifyToken;

module.exports = {
	initializeMongooseConnection,
	userModel,
	signJWTToken,
	verifyJWTToken
}