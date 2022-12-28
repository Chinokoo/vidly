//loadig the modules here.
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
//winston.handleExceptions(new winston.transports.File, { filename: 'uncaughtExceptions.log' });
//new winston.transports.Console({ colorize: true, prettyPrint: true });
/*winston.add(winston.transports.MongoDB, {
    db: 'mongodb://127.0.0.1:27017/Vidly',
    level: 'info'
});*/
// SETTING THE CONFIGURATIONS.........
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwt not defined!');
    process.exit(1);
}

// listening to port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started at port ${port}; press ctr & C buttons to cancel.`));