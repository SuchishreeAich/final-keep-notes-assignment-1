// write your server code here
const app = require('../app');
const { serverConfig } = require('../config').appConfig;

app.listen(serverConfig.port,() => {
   // console.log('Server is running on port : '+serverConfig.port);
})