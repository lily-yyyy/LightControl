const mongoose = require('mongoose');

module.exports = mongoose.model('Client', new mongoose.Schema({
    clientID: { type: String, required: true, unique: true },
    apartmentID: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true }
}));