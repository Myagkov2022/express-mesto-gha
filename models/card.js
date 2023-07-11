const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      minlength: 2,
      maxlength: 30,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
