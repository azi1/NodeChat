require('../config/config');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utills/message');


const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port  = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath)); // middleware

io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat room app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'new User has joined'));

    socket.on('createMessage', (message) => {
        console.log(message);
      
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
 
    socket.on('sendUserLocation',(coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude ));

    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});










server.listen(port,()=>{
    console.log(`SERVER is up on ${port}`);
});