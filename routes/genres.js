// loading the modules.....
const Joi = require('joi');
const { Genre, genreJoiSchema } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD OPERATIONS.

//getting the genres from the database...
router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort('name');

    if (!genres) return res.status(404).send('404--The genre with the given ID was not found.');

    res.status(200).send(genres);
});

//geting a single genre from our database
router.get('/api/genres/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    res.send(genre);
});


//adding a genre to our database...
router.post('/api/genres', auth, async (req, res) => {

    const validateGenre = genreJoiSchema.validate(req.body);

    if (validateGenre.error) return res.status(400).send(validateGenre.error.message);

    const genre = new Genre({
        genre: req.body.genre
    });

    result = await genre.save();

    res.send(result);
});

//updatng a genre in our database...
router.put('/api/genres/:id', [auth, admin], async (req, res) => {
    const validateGenre = genreJoiSchema.validate(req.body);
    if (validateGenre.error) return res.status(400).send(validateGenre.error.message);

    const genres = await Genre.findById(req.params.id);
    if (genres.genre === req.body.genre) return res.status(400).send('genre already exists.');

    const genre = await Genre.findByIdAndUpdate(req.params.id, { genre: req.body.genre }, { new: true });
    if (!genre) return res.status(404).send('404--The genre with the given ID was not found.');

    res.send(genre);
});

//deleting a genre from our database.....
router.delete('/api/genres/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

//adding our module to the index module.
module.exports = router;