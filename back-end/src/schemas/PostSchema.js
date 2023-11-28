import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  usrImg: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hashtags: [{
    type: String
  }]
});

const LettucePost = mongoose.model('LettucePost', lettucePostSchema);

module.exports = LettucePost;
