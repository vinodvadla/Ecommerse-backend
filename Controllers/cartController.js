const Product = require("../Models/productModel");
const User = require("../Models/userModel");

let cartRender = (req, res) => {
  res.render("cart.ejs");
};
const addToCart = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.user;
    if (user) {
      let product = await Product.findById({ _id: id });
      let user = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { favorites: product } }
      );
      res.redirect("/shop/1");
    }
    res.json({ message: "please login" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cartRender, addToCart };
