let express = require("express");
const { cartRender } = require("../Controllers/cartController");

let router = express.Router();

router.get("/cart", cartRender);

module.exports = router;
