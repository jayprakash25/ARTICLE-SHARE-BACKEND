const UserSharedPostRouter = require("express").Router();
const Users = require("../models/Users");

UserSharedPostRouter.put("/shared-post", async (req, res) => {
  const { Userjwt, Postid, image, Tittle, Category } = req.body;

  const Post = {
    Postid,
    image,
    Tittle,
    Category,
    Views: 0,
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

    sharedPosts.forEach((post) => {
      allPosts = allPosts.concat(post.SharedPosts);
    });
    res.json(allPosts);
  } catch (error) {
    console.log(error);
  }
});

UserSharedPostRouter.get("/shared-post/:postId/view", async (req, res) => {
  const { postId } = req.params;

  try {
    const sharedPosts = await Users.find({ "SharedPosts.Postid": postId });

    if (!sharedPosts) {
      return res.status(404).json({ message: "Post not found!" });
    }

    let updatedPost = null;

    sharedPosts.forEach((user) => {
      const postIndex = user.SharedPosts.findIndex(
        (post) => post.Postid === postId
      );

      if (postIndex !== -1) {
        user.SharedPosts[postIndex].Views += 1;
        updatedPost = user.SharedPosts[postIndex];
      }
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    await Promise.all(sharedPosts.map((user) => user.save()));

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = UserSharedPostRouter;
