const postModel = require("../model/post-model");

const postCtrl = {
  createPost: async (req, res) => {
    const inputObj = {
      postTitle: req.body.postTitle,
      description: req.body.postDescription,
    };
    try {
      const newPost = await postModel.create({ ...inputObj });
      if (newPost) {
        res.json({ msg: "Post created successfully" });
      } else {
        res.json({ msg: "throw.error" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchPost: async (req, res) => {
    try {
      const fetchedPosts = await postModel.find();
      if (fetchedPosts.length > 0) {
        res.json({ fetchedPosts, msg: "Result fetched successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = postCtrl;
