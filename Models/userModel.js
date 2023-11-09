const mongoose = require("mongoose");
let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    favorites: [],
    default: [],
  },
  { timestamps: true }
);

const userModel = mongoose.model("Ecom-User", userSchema);

module.exports = userModel;
