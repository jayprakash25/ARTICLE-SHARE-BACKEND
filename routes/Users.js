const User = require("express").Router();
const Usermodel = require("../models/Users");

User.post("/user/signup", async (req, res) => {
  const { Name, Age, Phone, Address } = req.body;
  const User = new Usermodel({
    Name,
    Age,
    Phone,
    Address,
  });
  await User.save().then((user) => {
    res.send({ jwt: user.id });
    console.log("SAVED");
  });
});
module.exports = User;
