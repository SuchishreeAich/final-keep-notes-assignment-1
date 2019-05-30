const userDAO = require('./user.dao');

const loginUser = (userDetails) => {
    return userDAO.loginUser(userDetails);
}

const registerUser = (userDetails) => {
    return userDAO.registerUser(userDetails);
}

const getAllRegisteredUsers = () => {
    return userDAO.getAllRegisteredUsers();
}

module.exports = {
    loginUser,
    registerUser,
    getAllRegisteredUsers
}