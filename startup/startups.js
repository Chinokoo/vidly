const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const router = express.Router();


module.exports = function (app) {
    // middle ware functions are all here.
    app.use(express.json());
    app.use(cors());
    app.use(router, genres);
    app.use(router, customers);
    app.use(router, movies);
    app.use(router, rentals);
    app.use(router, users);
    app.use(router, auth);
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        console.log('morgan enabled .......');
    }
    if (app.get('env') === 'production') {
        console.log('production mode......');
        console.log('morgan disabled .....');
    }
    app.use(error);


}