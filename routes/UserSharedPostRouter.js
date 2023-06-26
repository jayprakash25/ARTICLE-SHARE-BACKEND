const UserSharedPostRouter = require("express").Router();
const Users = require("../models/Users");


UserSharedPostRouter.put("/shared-post", async (req, res) => {
  const { Userjwt,Postid, image, Tittle, Category, } = req.body;

  const Post = {
   Postid,
   image,
   Tittle,
   Category,
  };

  try {

    if (!Users.findById(Userjwt)) {
      return res.json({ message: "Userjwt not found!" });
    }

    const inertSharedPost = await Users.findOneAndUpdate(
      { _id: Userjwt },
      {
        $push: { SharedPosts: Post },
      },
      { new: true } 
    );
    console.log("SAVED");
    return res.status(200).json(inertSharedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});


UserSharedPostRouter.get("/shared-post", async (req, res) => {


  try {
    const sharedPosts = await Users.find();
    let allPosts = [];

    sharedPosts.forEach(post => {
      allPosts = allPosts.concat(post.SharedPosts);
    });
    res.json(allPosts);
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const sharedPosts = await Users.find();
  //   const allSharedPostsData = sharedPosts.map(post => post.toObject());
  //   res.json(allSharedPostsData);
  // } catch (err) {
  //   console.error("Failed to fetch shared posts from the database", err);
  //   res.sendStatus(500);
  // }
});

module.exports = UserSharedPostRouter;
