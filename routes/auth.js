//loading the modules..........
const { User } = require('../models/user');
const asyncMiddleware = require('../middleware/async');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD OPERATIONS........


//authorising a user.........
router.post('/api/auth', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');
    if (user.admin) {
        const adminToken = jwt.sign({ _id: user._id, admin: true }, config.get('jwtPrivateKey'));
        res.send(adminToken)
    }
    if (!user.admin) {
        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
        res.send(token)
    }


});

module.exports = router;