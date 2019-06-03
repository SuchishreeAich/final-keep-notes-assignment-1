const app = require('../app');
const appConfig = require('../config').appConfig;

const port = appConfig.serverConfig.port;
const server = require('http').createServer(app);

server.listen(port, () => {
});