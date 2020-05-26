const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const router = require('./router');

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const User = require('./models/users');
const Message = require('./models/message');

const app = express();
const server = app.listen(5000);
const io = socketio.listen(server);

// console.log(io);

let timeout;

app.use(cors());
app.use(express.json());
app.use(router);

const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);

io.on('connection', (socket) => {
  socket.on('join', ({ from, to }, callback) => {
    // Get all messages stored in mongodb b/w from and to
    Message.find({$or:[{ from: from, to: to },{ from: to, to: from }]}).then(messages => {
      socket.emit('get_messages', messages);
      // console.log(messages);
    })
    let room = '';
    if(from < to) {
      room = from + '_' + to;
    }
    else {
      room = to + '_' + from;
    }
    // console.log(room);
    socket.join(room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(room).emit('message', { room: room, from: from, to: to });

    // callback();
  });

  socket.on('typing', ({ to, from, typing }) => {
    let room = '';
    if(from < to) {
      room = from + '_' + to;
    }
    else {
      room = to + '_' + from;
    }
    if(typing)
      socket.broadcast.to(room).emit('top-status', `is typing`);
    else
      socket.broadcast.to(room).emit('top-status', ``);
  });

  socket.on('sendMessage', (response, callback) => {
    // Add an entry in message model
    const to = response.to;
    const from = response.from;
    let room = '';
    if(from < to) {
      room = from + '_' + to;
    }
    else {
      room = to + '_' + from;
    }

    let count = io.sockets.adapter.rooms[room];
    let status = false;
    if(count.length == 2)
      status = true;
    console.log(count);

    const msg = new Message({
      to: response.to,
      from: response.from,
      text: response.text,
      status: status,
    });

    const re = {
      to: response.to,
      from: response.from,
      text: response.text,
      status: status,
    }

    msg.save((err, m) => {
      if(err) return console.log(err);
    });

    io.to(room).emit('response', re);
  });

  // socket.on('disconnect', () => {
  //   const user = removeUser(socket.id);

  //   if(user) {
  //     io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
  //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
  //   }
  // })
});

app.listen(app.get('port'), () => console.log(`Server has started.`));