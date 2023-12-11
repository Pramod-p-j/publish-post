const route = require("express").Router();

const userCtrl = require("../controller/user-controller");
const loginCtrl = require("../controller/auth-controller");
const postCtrl = require("../controller/post-controller");

route.post("/login", loginCtrl.login);
route.post("/google-signup", userCtrl.googleSignUp);
route.post("/google-login", loginCtrl.googleLogin);
route.post("/register-user", userCtrl.register);
route.post("/create-post", postCtrl.createPost);
route.post("/fetch-posts", postCtrl.fetchPost);

module.exports = route;
