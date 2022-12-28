const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    admin: {
        type: Boolean,
        required: true
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, admin: this.admin }, config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('User', userSchema);
//loading the joi schema...
const userJoiSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(4)
        .max(50),
    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .required(),
    password: Joi.string()
        .required()
        .min(5)
        .max(15),
    admin: Joi.boolean()
        .required()
})

module.exports.userJoiSchema = userJoiSchema;
module.exports.User = User;