const socket = require('socket.io-client')('http://localhost:3003');
socket.on('connect', () => {

  const userInfo = 'abc@g.com';
  socket.emit('register', userInfo);
})

socket.on('share-note', (shareInfo) => {
});

socket.on('disconnect', () => {
});