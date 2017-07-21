const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// PART SCHEMA
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

//SEED DATABASE
Part.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  if (count > 0) return ;

  const parts = require('./file.seed.json');
  Part.create(parts, function(err, newParts) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });
});

module.exports.getPartById = function(id, callback) {
    Part.findById(id, callback);
}

module.exports.addPart = function(newPart, callback) {
    newPart.save(callback);
};
