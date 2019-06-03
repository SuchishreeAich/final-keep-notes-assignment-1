const socketIo = require('socket.io');

let io;
let connectedSessions = [];

const setupSocket = (server) => {
  io = socketIo(server);

  io.on('connection', onSocketConnect);
}

const onSocketConnect = (socket) => {

  socket.on('register', userName => {
    connectedSessions = connectedSessions.filter(thesession => thesession.userName !== userName);
    
    let newSession = {
      id: socket.id, 
      userName: userName
    };
    
    connectedSessions.push(newSession);

  });

  socket.on('deregister', userName => {
    connectedSessions = connectedSessions.filter(thesession => thesession.userName !== userName);
 });
};

// notification = { userName: <userName>, note: <note>}
const sendNotification = (notification) => {
  
  const session = connectedSessions.find(thesession => thesession.userName == notification.userName);
  
  if(session) {

    const socketId = session.id;
    if(!notification.self) {
      io.to(socketId).emit('share-note', notification);
    } else {
      io.to(socketId).emit('reminder', notification);
    }
    return true;
  } else {
    return false;
  }
}

module.exports = {
  setupSocket,
  sendNotification
}
