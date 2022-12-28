const mongoose = require('mongoose');


module.exports = function () {
    //CONNECTING TO OUR MONGODB.....
    mongoose.connect('mongodb://127.0.0.1:27017/Vidly')
        .then(() => console.log('Connection to the Database is successfull; Press CTR & C to terminate.'))
        .catch(err => console.error('Connection Failed!', err));

}