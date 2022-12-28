//loading the modules here.
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const express = require('express');
const app = express();
require('./startup/startups')(app)
require('./startup/db')();


// winston ..........
winston.add(winston.transports.File, { filename: 'logfile.log' });

process.on('uncaughtException', (ex) => {
    console.log('we got an uncaught exception.');
    winston.error(ex.message, ex);
    process.exit(1);
});
process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1)
});
process.on('uncaughtException', (ex) => {
    throw ex;
});

// SETTING THE CONFIGURATIONS.........
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwt not defined!');
    process.exit(1);
}

// listening to port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started at port ${port}; press ctr & C buttons to cancel.`));