const Product = require("../Models/productModel");

const AddProduct = async (req, res) => {
  try {
    const data = req.body;
    const id = await Product.find({});

    if (id) {
      let product = new Product({
        ...data,
        id: id.length + 1,
      });
      await product.save();
      res.json({ ...data, id: id });
    } else {
      let product = new Product({
        ...data,
        id: 1,
      });
      await product.save();
    }
  } catch (err) {
    res.json({err})
  }
};

const getAllProducts = async (req, res) => {
  let data = await Product.find({});
  res.json({ data: data });
};

const findBYid = async (req, res) => {
  let id = req.params.id;
  let data = await Product.findOne({ _id: id });

  let featured = await Product.find({ category: data.category });
  res.render("product.ejs", { product: data, featured: featured });
};

module.exports = { AddProduct, getAllProducts, findBYid };
