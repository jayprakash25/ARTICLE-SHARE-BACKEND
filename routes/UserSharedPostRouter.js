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

    const savePost = async () => {
      await Users.findOneAndUpdate(
        { _id: Userjwt },
        {
          $push: { SharedPosts: Post },
        },
        { new: true }
      );
      console.log("Shared Post Saved");
    };

    const postExist = Users.findById(Userjwt).then((user) => {
      user.SharedPosts.map((post) => {
        if (post.Postid === Postid) {
          console.log("Post already exists:(");
          return true;
        } else {
          return false;
        }
      });
    });

    Users.findById(Userjwt).then((user) => {
      if (user.SharedPosts.length === 0 || !postExist) {
        savePost();
      }
    });

    // return res.status(200).json(inertSharedPost);
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

UserSharedPostRouter.get("/blog/:Userjwt/:postId", async (req, res) => {
  const { Userjwt, postId } = req.params;

  try {
    const user = await Users.findById(Userjwt);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = user.SharedPosts.find((post) => post.Postid === postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    post.Views = post.Views;
    await user.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = UserSharedPostRouter;
