const mongoose = require('mongoose');

module.exports = mongoose.model('Apartment', new mongoose.Schema({
    apartmentID: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    lightOne: { type: String, required: true},
    lightTwo: { type: String, required: true },
    lightThree: { type: String, required: true}
}));