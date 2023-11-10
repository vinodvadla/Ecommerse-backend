let express = require("express");
const {
  cartRender,
  addToCart,
  deleteFromCart,
} = require("../Controllers/cartController");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");
let router = express.Router();
router
  .get("/cart", cartRender)
  .get("/cart/:id", addToCart)
  .get("/cart/home/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let user = req.user;
      if (user) {
        let product = await Product.findById({ _id: id });
        await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { favorites: product } }
        );
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .get("/delete/:id", deleteFromCart);

module.exports = router;
