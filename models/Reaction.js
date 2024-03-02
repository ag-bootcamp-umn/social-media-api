const mongoose = require('mongoose');
const { formatDate } = require('../utils/helpers');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: ts => formatDate(ts)
  },
},
  {
    toJSON: {
      getters: true
    },
    id: false,
    _id: false // we are bringing our own ID
  }
);

module.exports = reactionSchema;