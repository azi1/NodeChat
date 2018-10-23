require('../config/config');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utills/message');


const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port  = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath)); // middleware

io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat room app from admin'));
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'new User has joined'));

    socket.on('createMessage', (message) => {
        console.log(message);
      
        io.emit('newMessage', generateMessage(message.from, message.text));

        //     socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });
 

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});










server.listen(port,()=>{
    console.log(`SERVER is up on ${port}`);
});