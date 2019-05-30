const jwt = require('jsonwebtoken');
const { authConfig } = require('../../../config').appConfig;


const signToken = (payload, secret, expireIn, callback) => {
    const expiresIn = { expiresIn: expireIn };
    jwt.sign(payload, secret, expiresIn, callback);
}

const verifyToken = (token, secret, callback) => {
    //jwt.verify(token, secret, callback);

    jwt.verify(token, secret, (error, decoded) => {
        let errMsg;
        //console.log('verify 1', error);
        //console.log('verify 2', decoded);
        if (error && !decoded) {
            //res.status(403).send('invalid token');            
            errMsg = 'invalid token';
        }

        callback(errMsg, decoded);

    });
}

const isAuthenticatedUser = (req, res, next) => {

    console.log('inside isAuthenticatedUser');

    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        res.status(403).send('Not authenticated');
    }
    else {
        const token = authorizationHeader.replace('Bearer ', '');
        console.log('token : ', token);

        verifyToken(token, authConfig.jwtSecret, (err, decoded) => {
            console.log('error in verify : ', err);
            console.log('decoded in verify : ', decoded);

            if (err) {
                if (err.name && err.name === 'TokenExpiredError') {
                    res.status(403).send('Expired Token');
                }
                else if (err.message && err.message.includes('invalid')) {

                    res.status(403).send('invalid token');
                }
                else if (err.message) {
                    res.status(403).send(err.message);
                } else {
                    res.status(403).send(err);
                }
            }
            else if (decoded) {
                //req.userId = decoded.userId;
                if (next) {
                    console.log('going to next : ');
                    next();
                } else {
                    console.log('success');
                    res.status(200).send({
                        message: 'User Autheticated',
                        isAuthenticated: true
                    });
                }
            }
        });
    }
}

const isAuthenticatedUserEndPoint = (req, res, next) => {

    console.log('inside isAuthenticatedUser');

    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        res.status(403).send('Not authenticated');
    }
    else {
        const token = authorizationHeader.replace('Bearer ', '');
        console.log('token : ', token);

        verifyToken(token, authConfig.jwtSecret, (err, decoded) => {
            console.log('error in verify : ', err);
            console.log('decoded in verify : ', decoded);

            if (err) {
                if (err.name && err.name === 'TokenExpiredError') {
                    res.status(403).send('Expired Token');
                }
                else if (err.message && err.message.includes('invalid')) {

                    res.status(403).send('invalid token');
                }
                else if (err.message) {
                    res.status(403).send(err.message);
                } else {
                    res.status(403).send(err);
                }
            }
            else if (decoded) {
                console.log('success');
                res.status(200).send({
                    message: 'User Autheticated',
                    isAuthenticated: true
                });
            }
        });
    }
}

module.exports = {
    signToken,
    verifyToken,
    isAuthenticatedUser,
    isAuthenticatedUserEndPoint
    
}