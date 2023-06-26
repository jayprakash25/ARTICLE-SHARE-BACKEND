const mongoose = require("mongoose");

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
  SharedPosts: [Object],  
});

const Usermodel = mongoose.model("USERSIGNUPS", UserSchema);

module.exports = Usermodel;
