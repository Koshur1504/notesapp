const jsonwebtoken = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jsonwebtoken.verify(token, "secret", async (error, verify) => {
      if (verify) {
        const id = verify.id;
        const user = await UserModel.findById(id);
        req.role = user.role;
        req.body.userID = user.id;
        req.body.username = user.username;
        next();
      } else {
        return req.status(200).send({ msg: "No tokken" });
      }
    });
  } else {
    return res.status(401).send({ msg: "please login" });
  }
};

module.exports = { auth };
