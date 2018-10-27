require('../config/config');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utills/message');
const {isRealString}  = require('./utills/validate');
const {Users} = require('./utills/users');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port  = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath)); // middleware

var user  = new Users();

io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.on('createMessage', (message, callback) => {
        var newUser = user.getUser(socket.id);
        console.log(message);
        if(newUser && isRealString(message.text)) {
            io.to(newUser.room).emit('newMessage', generateMessage(newUser.name, message.text));
        }
       
        callback();
    });
 
    socket.on('sendUserLocation',(coords) => {
        console.log(coords);
        var newUser = user.getUser(socket.id);
        if(newUser) {
            io.to(newUser.room).emit('newLocationMessage', generateLocationMessage(newUser.name,coords.latitude, coords.longitude ));
        }


    });

    socket.on('join',(data, callback) => {
        const {name, room}  = data;
        if(!isRealString(name) || !isRealString(room)) {
           return callback('name and room fields are required');
        }
        socket.join(room);
        user.removeUser(socket.id);
        user.addUser(socket.id, name, room);
       
        io.to(room).emit('updateUserList', user.getUserList(room));
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat room app'));
        socket.broadcast.to(room).emit('newMessage',generateMessage('Admin', `${name} has joined`));

        callback();
    
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    var removedUser = user.removeUser(socket.id);
            if(removedUser) {
                io.to(removedUser.room).emit('updateUserList', user.getUserList(removedUser.room));
                io.to(removedUser.room).emit('newMessage',generateMessage('Admin', `${removedUser.name} has left`));
            }

    });
});










server.listen(port,()=>{
    console.log(`SERVER is up on ${port}`);
});