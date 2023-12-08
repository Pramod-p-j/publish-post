const userModel = require("../model/user-model");
const jwt = require("jsonwebtoken");
const customConst = require("../config/custom");
var _ = require("lodash");

const loginCtrl = {
  login: async (req, res) => {
    const loggedInUserObj = {
      email: req.body.loggedInUserObj.email,
      password: req.body.loggedInUserObj.password,
    };
    try {
      const loggedInUser = await userModel.findOne(loggedInUserObj);
      if (loggedInUser) {
        const token = jwt.sign(
          {
            fullName: loggedInUser.fullName,
            email: loggedInUser.email,
          },
          customConst.jwt_secret_key,
          { expiresIn: customConst.jwt_expiry_time }
        );
        const refinedUser = _.pick({ ...loggedInUser, token }, [
          "_doc",
          "token",
        ]);
        const mergedUser = { ...refinedUser._doc, token: refinedUser.token };
        res.json({
          msg: "login.success",
          token: token,
          user: mergedUser,
        });
      } else {
        res.json({ msg: "Something went wrong , Try again later" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = loginCtrl;
