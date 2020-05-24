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
        console.log("nm", req.body.name);
        const user = await User.find({ name: req.body.nm });
        res.status(200).json(user);
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

module.exports = router;