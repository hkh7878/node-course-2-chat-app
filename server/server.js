const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// 미들웨어
app.use(express.static(publicPath));

// socket.io 실행
io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  });

  // socket.broadcat.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});

// 서버 시작
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
