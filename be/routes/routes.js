const route = require("express").Router();

const userCtrl = require("../controller/user-controller");
const loginCtrl = require("../controller/auth-controller");
const postCtrl = require("../controller/post-controller");

route.post("/login", loginCtrl.login);
route.post("/register-user", userCtrl.register);
route.post("/create-post", postCtrl.createPost);
route.get("/fetch-posts", postCtrl.fetchPost);

module.exports = route;
