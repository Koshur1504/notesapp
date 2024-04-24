const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: ["customer", "seller", "buyer"],
      default: "customer",
    },
  },
  {
    versionKey: false,
  },
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
