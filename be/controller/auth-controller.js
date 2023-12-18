const userModel = require("../model/user-model");
const jwt = require("jsonwebtoken");
const customConst = require("../config/custom");
const issueJwt = require("../helpers/issue-jwt");
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
        /* const payloadObj = {
          fullName: loggedInUser.fullName,
          email: loggedInUser.email,
        }; */
        const token = jwt.sign(
          {
            fullName: loggedInUser.fullName,
            email: loggedInUser.email,
          },
          customConst.jwt_secret_key,
          { expiresIn: customConst.jwt_expiry_time }
        );
        /* const tokenOne = await issueJwt.tokenIssue(
          payloadObj,
          customConst.jwt_secret_key,
          customConst.jwt_expiry_time
        ); */
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
  googleLogin: async (req, res) => {
    const userObj = {
      email: req.body.googleUserObj.email,
    };
    const verifiedFlag = req.body.googleUserObj.verified
      ? req.body.googleUserObj.verified
      : false;
    try {
      const loggedInUser = await userModel.findOne(userObj);
      if (loggedInUser && verifiedFlag) {
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
        res.status(401).json({ msg: "Something went wrong, Try again later" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = loginCtrl;
