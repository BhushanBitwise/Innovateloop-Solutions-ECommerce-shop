const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, image, countInStock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    image,
    countInStock
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, image, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};
