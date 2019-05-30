const userService = require('./user.service');

const loginUser = (userDetails) => {
    return userService.loginUser(userDetails);
}

const registerUser = (userDetails) => {
    return userService.registerUser(userDetails);
}

const getAllRegisteredUsers = () =>{
    return userService.getAllRegisteredUsers();
}

module.exports = {
    loginUser,
    registerUser,
    getAllRegisteredUsers
}