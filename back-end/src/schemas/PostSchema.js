import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
  authorID: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User',
  },
  usrImg: {
    type: String,
    required: true,
    default: "/static/images/grey.png",
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  pickUpTime: {
    type: String,
    required: true,
    default: "Anytime",
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
}, { collection: 'Post' });

const Post = mongoose.model('Post', postSchema);

export default Post;
