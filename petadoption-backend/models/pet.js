const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['adopted', 'fostered', 'available'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: true,
  },
  dietaryRestrictions: {
    type: [String],
  },
  breed: {
    type: String,
    required: true,
  },
});
const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet; 
