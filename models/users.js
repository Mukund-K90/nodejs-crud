const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        length:6
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    mobileNumber: {
        type: Number,
        required: true,
        match: /^\d{10}$/
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true
    },
    aadharCard: {
        type: Number,
        required: true,
        match: /^\d{12}$/
    }
});

userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
