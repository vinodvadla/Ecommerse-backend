const express = require("express");
const auth = require("../Middlewares/auth");
const {
  homeRender,
  shopRender,
  aboutRender,
  contactRender,
  cartRender,
  singleProduct,
  signupRender,
  loginRender,
  register,
  login,
  profileRender,
  logOut,
} = require("../Controllers/EcomControllers");

const Router = express.Router();
Router.get("/", homeRender)
  .get("/shop/:page", shopRender)
  .get("/about", aboutRender)
  .get("/contact", contactRender)
  .get("/cart", cartRender)
  .get("/product", singleProduct)
  .get("/signup", signupRender)
  .get("/login", loginRender)
  .post("/signup", register)
  .post("/login", login)
  .get("/profile", profileRender)
  .get("/logout", logOut);
module.exports = Router;
