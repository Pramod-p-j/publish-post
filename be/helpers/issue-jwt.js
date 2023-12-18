const jwt = require("jsonwebtoken");

const issueJwt = {
  tokenIssue: async (inputObj, key, time) => {
    const token = jwt.sign(
      {
        fullName: inputObj.fullName,
        email: inputObj.email,
      },
      key,
      { expiresIn: time }
    );
    return token;
  },
};

module.exports = issueJwt;
