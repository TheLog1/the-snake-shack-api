const mongoose = require('mongoose')

const snakeSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  shed: {
    type: Date,
    required: true
  },
  fed: {
    type: Date,
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
