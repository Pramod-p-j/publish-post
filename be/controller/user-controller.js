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
};

module.exports = userCtrl;
