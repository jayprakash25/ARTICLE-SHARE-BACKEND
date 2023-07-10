const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  Postid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Tittle: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Views: {
    type: Number,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Age: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Address: {
    type: String,
  },
  SharedPosts: [PostSchema],
});

const Usermodel = mongoose.model("USERSIGNUPS", UserSchema);

module.exports = Usermodel;
