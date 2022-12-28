const Joi = require('joi');
const mongoose = require('mongoose');

// customer mongoose schema...... 
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    number: {
        type: String,
        required: true,
        minlength: 10
    }
}));
//loading the customer Joi schema.....
const customerJoiSchema = Joi.object({
    isGold: Joi.boolean()
        .required(),
    customerName: Joi.string()
        .required()
        .min(3)
        .max(50),
    number: Joi.string()
        .required()
        .min(10)
}).options({ abortEarly: false });
module.exports.customerJoiSchema = customerJoiSchema;
module.exports.Customer = Customer;
