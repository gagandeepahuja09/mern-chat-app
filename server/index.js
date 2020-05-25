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
  console.log("reached");
  socket.on('join', ({ f, t }, callback) => {
    // const { error, user } = addUser({ id: socket.id, name, room });
    console.log("heeee");

    // if(error) return callback(error);

    // Get all messages stored in mongodb b/w from and to
    Message.find({ from: f, to: t }).then(messages => {
      socket.emit('get_messages', messages);
    })

    // socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // callback();
  });

  socket.on('typing', (name) => {
    /* const user = getUser(socket.id);
    if(user && name)
      socket.broadcast.to(user.room).emit('top-status', `${name} is typing`);
    else
      socket.broadcast.to(user.room).emit('top-status', ''); */
  });

  socket.on('sendMessage', (response, callback) => {
    // User.find({ name: from });
    console.log("sending message");
    // if(user) {
    //   io.emit('message', { user: response.from, text: response.text });
    // }
    // Add an entry in message model
    const msg = new Message(response);
    msg.save((err, m) => {
      if(err) return console.log(err);
      console.log(m.text + m.from + m.to + "saved");
    });
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