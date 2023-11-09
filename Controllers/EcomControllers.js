const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Middlewares/auth");
const Product = require("../Models/productModel");

const homeRender = async (req, res) => {
  try {
    let products = await Product.find({ id: { $lte: 8 } });
    let total = await Product.find({});
    let newArrival = await Product.find({ id: { $gte: total.length - 7 } });
    res.render("home.ejs", { products: products, newArrival });
  } catch (error) {
    console.log(error);
  }
};
const shopRender = async (req, res) => {
  try {
    let page = +req.params.page;
    let totalProducts = await Product.find({});
    let products = await Product.find({})
      .skip((page - 1) * 16)
      .limit(page * 16);
    let pages = Math.floor(totalProducts.length / 16);
    res.render("shop.ejs", { products, pages });
  } catch (error) {
    console.log(error);
  }
};
const aboutRender = (req, res) => {
  res.render("about.ejs");
};
const contactRender = (req, res) => {
  res.render("contact.ejs");
};
const cartRender = (req, res) => {
  res.render("cart.ejs");
};
const singleProduct = (req, res) => {
  res.render("product.ejs");
};
const signupRender = (req, res) => {
  res.render("signup.ejs");
};
const loginRender = (req, res) => {
  res.render("login.ejs");
};
const profileRender = (req, res) => {
  res.render("profile.ejs");
};
const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);
    let user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(404).render("signup.ejs", { error: "User already exists" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.status(404).render("login.ejs", { error: "User does not exists" });
  } else {
    let compared = await bcrypt.compare(password, user.password);
    console.log(compared);
    if (!compared) {
      res
        .status(404)
        .render("login.ejs", { error: "Incorrect Password or email" });
    } else {
      let token = await jwt.sign({ ...user }, "vinod7144");
      res.cookie("token", token);
      res.redirect("/");
    }
  }
};

module.exports = {
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
  profileRender
};
