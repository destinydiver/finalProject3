const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Car Part Schema
const PartSchema = mongoose.Schema({
    vehicle: {
        type: String
    },
    partDescription: {
        type: String,
        required: true
    },
    forTrade: {
        type: Boolean
    },
    forSale: {
        type: Number
    }
});

const Part = module.exports = mongoose.model('Part', PartSchema);

module.exports.getPartById = function(id, callback) {
    Part.findById(id, callback);
}

module.exports.addPart = function(newPart, callback) {
    newPart.save(callback);
};
