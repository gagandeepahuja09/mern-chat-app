const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users'); 

const router = require('./router');

const PORT = process.env.PORT || 5000

const app = express();
// Initialize a server for app
const server = http.createServer(app);
// Create a socket.io server
const io = socketio(server);

// method, which gets called whenever we have a new connection
io.on('connection', (socket) => {
    console.log("We have a new connection");

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id :  socket.id, name, room });
        
        if(error)   return callback(error);

        // 'message' => Admin generated messages
        // message, for a particular user emitting from backend to frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        // send message to everyone, besides that specific user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` }); 

        // 'sendMessage' => User generated message
        // on => expecting on backend 
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);

            io.to(user.room).emit('message', { user: user.name, text: message });
            // callback is to do something on frontend after the message is sent
            callback();
        }); 

        // built in function to join the user in a room
        socket.join(user.room);

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had left');
    });
});

// Use this router as middleware
app.use(router);


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));