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

// Use this router as middleware
app.use(router);


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));