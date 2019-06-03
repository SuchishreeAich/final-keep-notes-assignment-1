const app = require('../app');
const config = require('../config');



const port = config.WWW_PORT;

app.listen(port, () => {
  
})

// const server = require('http').createServer(app);

// server.listen(port, () => {
//   log.info(`Server is running on port ${port}`);
// });