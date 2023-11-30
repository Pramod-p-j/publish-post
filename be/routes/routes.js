const route = require("express").Router();

const userCtrl = require("../controller/user-controller");
const loginCtrl = require("../controller/auth-controller");

route.post("/login", loginCtrl.login);
route.post("/register-user", userCtrl.register);

module.exports = route;
