const UserDashBoard = require("express").Router();
const Usermodel = require("../models/Users");

UserDashBoard.get("/user/:userjwt", async (req, res) => {
  const { userjwt } = req.params;
  Usermodel.findById(userjwt)
    .then((user) => {
      let views = 0;

      // Total user SharedPost
      const totalSharedPost = user.SharedPosts.length;
      // Total Number of Views
      user.SharedPosts.map((item) => {
        views += item.Views;
      });

      const DashBoard = {
        totalLikedPost: totalSharedPost,
        totalViews: views,
      };

      res.send(DashBoard);
    })

    .catch((err) => {
      console.log("User Not Found");
    });
});

module.exports = UserDashBoard;
