const express = require('express');
const httpProxy = require('http-proxy-middleware');
const config = require('./config');

let app = express();

app.use('/apigateway', (request, response) => {
  response.send("Showing API Gateway");
})

let usersProxy = httpProxy({target : config.USERS_URL,pathRewrite : {'^/users/' : '/api/v1/users/' }}); 
app.use('/users/',usersProxy);
  

let notesProxy = httpProxy({target : config.NOTES_URL,pathRewrite : {'^/notes/' : '/api/v1/notes/'}});
app.use('/notes/',notesProxy);

let notificationsProxy = httpProxy({target : config.NOTIFICATIONS_URL,pathRewrite : {'^/notifications/' : '/api/v1/notifications/'}});
app.use('/notifications/',notificationsProxy);

let webProxy = httpProxy({target : config.WEB_URL,pathRewrite : { '^/web/' : '/web/'}});
app.use('/web/',webProxy);

app.use((request, response) => {
  response.status(404).send({message : "Not Found."});
});

module.exports = app;