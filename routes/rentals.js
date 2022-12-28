//loading the modules.........
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Rental, rentalJoiSchema } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD ELEMENTS.........
//getting the rentals list from the DB.....
router.get('/api/rentals', async (req, res) => {
    const rentals = await Rental.find()
        .sort('-dateout')
        .populate('customer', 'customerName _id isGold number __v-_id ')
        .populate('movie', 'title numberInStock dailyRentalRate __v -_id');
    res.send(rentals);
});

//creating a new rental.......
router.post('/api/rentals', [auth, admin], async (req, res) => {
    const customer = await Customer.findById(req.body.customer._id);
    if (!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movie._id);
    if (!movie) return res.status(400).send('Invalid Movie');
    if (movie.numberInStock === 0) return res.status(400).send('movie not available.');

    const validateRental = rentalJoiSchema.validate(req.body)
    if (validateRental.error) return res.status(400).send(validateRental.error.message);

    let rental = new Rental({
        customer: customer,
        movie: movie,
        rentalFee: req.body.rentalFee
    });
    rental = await rental.save();
    const loco = {
        customer: _.pick(customer, ['isGold', 'customerName']),
        movie: _.pick(movie, ['title', 'dailyRentalRate']),
        rentalFee: req.body.rentalFee
    }
    movie.numberInStock--;
    movie.save();
    /*const task = Fawn.Task();
    task.update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } });
    task.run();*/
    res.send(loco);
});


module.exports = router;