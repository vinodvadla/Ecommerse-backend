const Product = require("../Models/productModel");
const User = require("../Models/userModel");

let cartRender = (req, res) => {
  res.render("cart.ejs");
};


module.exports={cartRender}
