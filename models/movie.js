//loading the modules....
const mongoose = require('mongoose');
const Joi = require('joi');

// declaring the movie schema......
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});
//declaring the movie model......
const Movie = mongoose.model('Movie', movieSchema);

//declaring the movie joi schema....
const movieJoiSchema = Joi.object({
    title: Joi.string()
        .required()
        .min(5)
        .max(255),
    genre: Joi.object()
        .required(),
    numberInStock: Joi.number()
        .required()
        .integer()
        .min(0)
        .max(100),
    dailyRentalRate: Joi.number()
        .required()
        .integer()
        .min(0)
        .max(100)
}).options({ abortEarly: false });


module.exports.movieJoiSchema = movieJoiSchema;
module.exports.Movie = Movie;