const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    maxLength: 500
  },
  like: {
    type: Array,
    default: []
  },
  textpost: {
    type: String,
    maxLength: 500
  },
  Article_ImgsorVideo: {
    type: Array,
    default: []
  },
  _comment: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Post", PostSchema);