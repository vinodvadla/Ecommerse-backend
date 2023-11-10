const Product = require("../Models/productModel");
const User = require("../Models/userModel");
let Cart = require("../Models/CartModel");

let cartRender = (req, res) => {
  if (req.user) {
    let user = req.user;
    res.render("cart.ejs", { user: user });
  }
};
const addToCart = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.user;
    console.log(user);
    let pro = await Product.findOne({ _id: id });
    let cart = await Cart.findOne({ user: user._doc._id });
    if (user && cart) {
      await Cart.updateOne({ _id: cart._id }, { $push: { cart: { ...pro } } });
      res.redirect("/shop/1");
    } else {
      if (user) {
        let cart = new Cart({
          user: user,
          cart: [pro],
        });
        await cart.save();
        res.redirect("/shop/1");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    let user = req.user;
    let id = req.params.id;
    let cart = await Cart.find({ user: user._id });
    // await Cart.updateOne({ user: user }, { $pull: { cart: { _id: id } } });
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cartRender, addToCart, deleteFromCart };
