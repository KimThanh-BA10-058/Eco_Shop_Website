const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('notification', (data) => {
    // Gửi thông báo đến tất cả các client
    io.emit('notification', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8081, () => {
  console.log('Server is running on port 3001');
});

