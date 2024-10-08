const mongoose = require('mongoose');

const connectToMongoDb = (dbUrl) => {
    return mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = {
    connectToMongoDb,
}