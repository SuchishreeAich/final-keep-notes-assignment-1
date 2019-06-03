const app = require('../app');
const appConfig = require('../config').appConfig;
const socket = require('../api/v1/notifications/socket/app.socket');
const socketClient = require('../app.client');

const port = appConfig.serverConfig.port;
const server = require('http').createServer(app);
socket.setupSocket(server);
socketClient.registerSocket();

server.listen(port, () => {
});