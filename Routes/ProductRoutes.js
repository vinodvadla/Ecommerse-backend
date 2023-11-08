const express = require("express");
const {
  AddProduct,
  getAllProducts,
  findBYid,
} = require("../Controllers/ProductsControllers");

let router = express.Router();
router.post("/", AddProduct).get("/all", getAllProducts).get("/:id", findBYid);
module.exports = router;
