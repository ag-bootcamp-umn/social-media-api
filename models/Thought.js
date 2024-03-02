const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');
const { formatDate } = require('../utils/helpers');

const thoughtSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: ts => formatDate(ts)
  },
  reactions: [reactionSchema] // subdocument
},
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;