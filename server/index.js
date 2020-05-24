// const http = require('http');
const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// const router = require('./router');

const app = express();
// const server = http.createServer(app);
// const io = socketio(server);


let timeout;

// app.use(cors());
// app.use(router);
app.use(express.json());

const users = [];

const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);

// app.get('/users', (req, res) => {
//   res.json(users);
// });

/*

app.post('/users/enter', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const check = users.find(user => user.name === req.body.name);
    console.log(check);
    if(check === undefined) {
      const user = { name: req.body.name, password: hashedPassword };
      users.push(user);
      res.status(201).send();
    }
    else {
      res.status(200).send();
    }
  } catch {
    res.status(500).send();
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      console.log(req.body.password);
      console.log(user.password);
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})


io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    // if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // callback();
  });

  socket.on('typing', (name) => {
    const user = getUser(socket.id);
    if(user && name)
      socket.broadcast.to(user.room).emit('top-status', `${name} is typing`);
    else
      socket.broadcast.to(user.room).emit('top-status', '');
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log("sending message");
    if(user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

*/

app.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));