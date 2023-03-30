const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  tags: [String],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  isPrivate: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Post', postSchema);
