//loading the modules..........
const { User, userJoiSchema } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD ELEMENTS........
//getting users from the database
router.get('/api/users', async (req, res) => {
    const users = await User.find().sort('username').select({ username: 1, email: 1, password: 1 });
    res.send(users);
});
//creating a new user.........
router.post('/api/users', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exists.');

    const validateUser = userJoiSchema.validate(req.body);
    if (validateUser.error) return res.status(400).send(validateUser.error.message);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    const loser = _.pick(user, ['username', 'email', '_id']);
    res.header('x-auth-token', token).send(loser);
});

module.exports = router;