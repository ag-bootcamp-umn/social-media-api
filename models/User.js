const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // indexing
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // indexing
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thought"
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
},
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;