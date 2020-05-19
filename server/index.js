const http = require('http');
const express = require('express');
const socketio = require('socket.io');

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

    socket.on('join', ({ name, room }) => {
        console.log(name, room);
    });

    socket.on('disconnect', () => {
        console.log('User had left');
    });
});

// Use this router as middleware
app.use(router);


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));