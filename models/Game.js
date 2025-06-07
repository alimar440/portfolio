const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    answered: {
      type: Boolean,
      default: false
    },
    userAnswer: {
      type: Number,
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    timeSpent: {
      type: Number,
      default: 0
    },
    pointsEarned: {
      type: Number,
      default: 0
    }
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['en cours', 'terminé', 'abandonné'],
    default: 'en cours'
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for completion percentage
gameSchema.virtual('completionPercentage').get(function() {
  if (this.questions.length === 0) return 0;
  const answeredQuestions = this.questions.filter(q => q.answered).length;
  return (answeredQuestions / this.questions.length) * 100;
});

// Virtual for accuracy
gameSchema.virtual('accuracy').get(function() {
  const answeredQuestions = this.questions.filter(q => q.answered);
  if (answeredQuestions.length === 0) return 0;
  const correctAnswers = answeredQuestions.filter(q => q.isCorrect).length;
  return (correctAnswers / answeredQuestions.length) * 100;
});

module.exports = mongoose.model('Game', gameSchema); 