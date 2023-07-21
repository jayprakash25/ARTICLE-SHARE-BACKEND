const express = require("express");
const app = express();
const Port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const { User, UserSharedPostRouter, UserDashBoard } = require("./routes/index");
// Using JSON data to communicate with server
app.use(express.json());
// connect to db
const dburl = "mongodb://127.0.0.1:27017/userDB";
mongoose
  .connect(dburl)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// user Signup Route
app.use("/", User);
// user liked posts
app.use("/", UserSharedPostRouter);
// user dashboard
app.use("/", UserDashBoard);
// server started
app.listen(Port, () => {
  console.log(`Server listening on ${Port}`);
});
