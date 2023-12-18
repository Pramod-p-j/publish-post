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
    let criteria = {};
    let searchText = "";
    let fetchedPosts = [];
    searchText = req.body.searchVal?.trim();
    if (searchText) {
      criteria = {
        ...criteria,
        postTitle: { $regex: searchText, $options: "i" },
      };
    }
    try {
      fetchedPosts = await postModel.find(criteria);
      if (fetchedPosts.length > 0) {
        res.json({ fetchedPosts, msg: "Result fetched successfully" });
      } else res.json({ fetchedPosts, msg: "No Posts found" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = postCtrl;
