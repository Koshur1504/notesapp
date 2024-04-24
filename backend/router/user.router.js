const jsonWebToken = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const userRouter = require("express").Router();

userRouter.post("/register", async (req, res) => {
  const { password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = new UserModel({ ...req.body, password: hash });
    await user.save();
    res.status(201).json({ msg: "A new User has been registered" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, () => {
        const accessToken = jsonWebToken.sign({ id: user.id }, "secret", {
          expiresIn: "1d",
        });
        res.status(200).send({ msg: "Login Success", accessToken });
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

module.exports = { userRouter };
