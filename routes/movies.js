//loading the modules.......
const { Movie, movieJoiSchema } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD OPERATIONS.......

//getting movies from the database....
router.get('/api/movies', async (req, res) => {
    const movies = await Movie
        .find()
        .populate('genre', '-__v')
        .sort('name');
    res.send(movies);
});

//getting a movie from the database.....
router.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
});

// adding a movie to the database......
router.post('/api/movies', [auth, admin], async (req, res) => {
    const genre = await Genre.findById(req.body.genre._id);
    if (!genre) return res.status(400).send('the Genre with the given id was not found.');
    const validateMovie = movieJoiSchema.validate(req.body)
    if (validateMovie.error) return res.status(400).send(validateMovie.error.message);
    let movie = await Movie.findOne({ title: req.body.title });
    if (movie) res.status(400).send('Movie with the given title already exists.')
    movie = new Movie({
        title: req.body.title,
        genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    const result = await movie.save();
    res.send(result);
});
//updating a movie in the database.......
router.put('/api/movies/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findById(req.body.genre._id);
    if (!genre) res.status(400).send('invalid genre');
    const validateMovie = movieJoiSchema.validate(req.body)
    if (validateMovie.error) return res.status(400).send(validateMovie.error.message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    }, { new: true });

    if (!movie) return res.status(404).send('404--The movie with the given ID was not found.');
    res.send(movie);
});
//deleting a movie from our database....
router.delete('/api/movies/:id', [auth, admin], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('404--the movie with the given ID was not found.')
    res.send(movie);
});

//adding our module to the index module.
module.exports = router;