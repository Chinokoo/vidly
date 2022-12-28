const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    dateout: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0,
        required: true
    }
}));
//loading a new rental joi schema.....
const rentalJoiSchema = Joi.object({
    customer: Joi.object({ _id: Joi.required() }),
    movie: Joi.object({ _id: Joi.required() }),
    dateReturned: Joi.date().optional(),
    rentalFee: Joi.number().min(0).required()
}).options({ abortEarly: false });

module.exports.rentalJoiSchema = rentalJoiSchema;
module.exports.Rental = Rental;