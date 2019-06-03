const db = require('./db');
const auth  = require('./api/v1/auth');
/* Replace undefined with Require of your Mongoose connection initialization method */
const initializeMongooseConnection = () => {
	db.createMongoConnection();
	db.getMongoConnection();
};
/* Replace undefined with the method or function reference, which signs the token with given payload, expiry time and secret, call back should have error or signed token */
const signJWTToken = auth.signToken;
/* Replace undefined with the method or function reference, which verifies a given JWT Token and callback with error & payload */
const verifyJWTToken = auth.verifyToken;

module.exports = {
	initializeMongooseConnection,
	signJWTToken,
	verifyJWTToken
}