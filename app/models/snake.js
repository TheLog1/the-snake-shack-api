const mongoose = require('mongoose')

const snakeSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  morph: {
    type: String,
    required: true
  },
  shed: {
    type: String,
    required: true
  },
  fed: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Snake', snakeSchema)
