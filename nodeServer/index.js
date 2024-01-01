// Node Server which will handle socket io connections
const express = require("express")
var app = express();
const hostname = '127.0.0.1';
const port = 8000;
var server = app.listen(port);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});
// socket io port to run 
const users = {};
// Object to store all the connected clients
/*
const users ={};
const corst: {
    origin is the most imp then  are the best are the 
    then you are the most imp thing is the best are
    then you are haa kar 
    
}
*/

io.on('connection', socket =>{

    // this is a socket.io instance (listen many socket connection (harry, marry etc))
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        // append on users (socket id = name)
        socket.broadcast.emit('user-joined', name);
        // after append show user-joined with name
    });
    // Add user in our list of online users and send him a message

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
        //  show user-message with name
    });
    // if send message anyone the receive message all with sender name

    // if someone leaves the CharacterData, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        //  show user-message with name
    });


});