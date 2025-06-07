const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 1
  },
  explanation: {
    type: String,
    trim: true
  },
  timesAnswered: {
    type: Number,
    default: 0
  },
  timesCorrect: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for success rate
questionSchema.virtual('successRate').get(function() {
  if (this.timesAnswered === 0) return 0;
  return (this.timesCorrect / this.timesAnswered) * 100;
});

module.exports = mongoose.model('Question', questionSchema); 