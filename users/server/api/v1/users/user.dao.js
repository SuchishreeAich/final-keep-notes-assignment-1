const userModule = require('./user.entity');
const uuidv1 = require('uuid/v1');
const {authConfig}  = require('../../../config').appConfig;
let auth = require('./auth');

const loginUser = (userInfo) => {

    return new Promise((resolve,reject) => {
              
        userModule.findOne({'username' : userInfo.username}, (error,data) => {
            
            if(error){
                reject({message : 'Login failure',status : 500});
            }
            else if(!data){
                reject({message : 'You are not registered user.Please click below to register',status : 403});
            }
            else if(data.password !== userInfo.password){
                reject({message : 'Passwords is incorrect',status : 403});
            }
            else{
                let payload = {userId : data.userId,userName : data.username};

                auth.signToken(payload,authConfig.jwtSecret,'10h',(error,generatedToken) => {

                    if(error){
                        reject({message : 'Passwords is incorrect',status : 403});
                    }
                    else{
                        let user = {userName : data.username,userId :  data.userId};
                        resolve({token:generatedToken,user:user,status:200}); 
                    }
                });                              
            }
        });        
    });
};

const registerUser = (userInfo) => {

    return new Promise((resolve,reject) => {

        let newUser = new userModule();
        newUser.userId = uuidv1();
        newUser.username = userInfo.username;
        newUser.password = userInfo.password;
        newUser.emailId = userInfo.emailId;

        let registeredUser;

        newUser.save((error,addedUser) => {

            if(error){
                
                if(error.message.includes('duplicate')){
                    registeredUser={userInfo:null};
                    reject({message : 'username is already exist',status : 403,user:registeredUser});
                }
                else{
                    registeredUser={userInfo:null};
                    reject({message : 'Registration Failure',status : 500,user:registeredUser});
                }
            }
            else{
                registeredUser={userInfo:addedUser.username};
                resolve({message : "Successfull register.Please click to login",status:201,user:registeredUser});
            }
        });
    });
};

const getAllRegisteredUsers = () => {

    return new Promise((resolve,reject) => {
        userModule.find({},(error,data) => {
            if(error){
                reject({message : 'error while obtaining users',status : 403,user:null});
            }
            else if(!data){
                reject({message : 'no user found',status : 500,user:null});  
            }
            else{
                resolve({message : "Returning all users",status:201,users:data});
            }
        });
    });
};

module.exports = {
    loginUser,
    registerUser,
    getAllRegisteredUsers 
}