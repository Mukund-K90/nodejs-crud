const mongoose = require('mongoose');
const moment = require('moment');

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: Number,
        required: true,
        unique: true
    },
    responseId: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    surveyName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    age: {
        type: Number,
        default: 0
    }
});

ticketSchema.methods.calculateAgeInDays = function() {
    const now = moment();
    const createdDate = moment(this.createdAt);
    return now.diff(createdDate, 'days');
};

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
