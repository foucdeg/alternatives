const mongoose = require('mongoose');

let voteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    required: true
  },
  option: {
    type: Date,
    required: true
  }
});

let alternativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  options: [Date],
  votes: [voteSchema]
});

module.exports.Alternative = mongoose.model('Alternative', alternativeSchema);
