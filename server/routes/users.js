const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/name', async(req, res) => {
    try {
        const user = await User.find({ name: req.body.name });
        res.json(user);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

  router.post('/', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        password: hashedPassword,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    } 
});

  router.post('/login', async (req, res) => {
    const user = await User.find({ name: req.body.name });
    try {
        console.log(user);  
        if(user.length === 0) {
            res.send('Username does not exist. New user? Please Register')    
        }
        else {
            if(await bcrypt.compare(req.body.password, user[0].password)) {
                res.send('');
            } 
            else {
                res.send('Invalid password, Please try again!')
            }
        }
    } catch {
        res.status(500).send()
    }
  });

module.exports = router;