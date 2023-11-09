let express = require("express");
const { cartRender, addToCart } = require("../Controllers/cartController");
let router = express.Router();
router
  .get("/cart", cartRender)
  .get("/cart/:id", addToCart)
  .get("/cart/home/:id", async (req, res) => {
    try {
      try {
        let id = req.params.id;
        let user = req.user;
        if (user) {
          let product = await Product.findById({ _id: id });
          let user = await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { favorites: product } }
          );
          res.redirect("/");
        }
        res.json({ message: "please login" });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
          console.log(error)
    }
  });

module.exports = router;
