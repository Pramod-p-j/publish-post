const userModel = require("../model/user-model");

const userCtrl = {
  register: async (req, res) => {
    const inputObj = {
      fullName: req.body.values.fullName,
      email: req.body.values.email,
      password: req.body.values.password,
      phoneNumber: req.body.values.phoneNumber,
    };
    try {
      const user = await userModel.create({ ...inputObj });
      if (user) {
        res.json({
          createdUser: user,
          msg: "user.added.success",
        });
      } else {
        res.json({
          msg: "throw.error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  googleSignUp: async (req, res) => {
    const userObj = {
      fullName: req.body.googleUserObj.fullName,
      email: req.body.googleUserObj.email,
      password: "",
      phoneNumber: "",
    };
    const verifiedFlag = req.body.googleUserObj.verified
      ? req.body.googleUserObj.verified
      : false;
    try {
      const loggedInUser = await userModel.create({ ...userObj });
      if (loggedInUser && verifiedFlag) {
        res.json({
          msg: "user.added.success",
        });
      } else {
        res.json({
          msg: "throw.error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userCtrl;
