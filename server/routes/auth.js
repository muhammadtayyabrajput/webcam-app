const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, phoneNumber }); // Use hashedPassword
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

//user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email); // Add this line
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Add this line
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }
        console.log('User found:', user); // Add this line
        const ispassValid = await bcrypt.compare(password, user.password);
        if (ispassValid) {
            const token = jwt.sign({ userId: user._id }, 'secretkeyapi321', { expiresIn: '1h' });
            console.log("sc", token)
            res.status(200).json({ token });
        } else {
            console.log('Invalid password'); // Add this line
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.log('Error:', error); // Add this line
        res.status(500).json({ message: 'Error authenticating user' });
    }
});


module.exports = router