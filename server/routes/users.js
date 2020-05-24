const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    try {
        res.send('Hello World');
        const user = await User.find();
        res.json(user);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/name', async(req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if(user) {
            res.status(200).json({ message: "Name already exists" });
        }
        else {
            res.status(200).json({ message: "New name" });
        }
        console.log(user);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async(req, res) => {
    const exist = await User.findById({ name: req.body.name });
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

module.exports = router;