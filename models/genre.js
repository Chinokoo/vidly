const mongoose = require('mongoose');
const Joi = require('joi');

//declaring the genre schema..
const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }
});
//declaring a genre model....
const Genre = mongoose.model('Genre', genreSchema);

// declaring the genre joi schema....
const genreJoiSchema = Joi.object({
    genre: Joi.string()
        .min(3)
        .max(15)
        .required()
});
module.exports.genreJoiSchema = genreJoiSchema;
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;