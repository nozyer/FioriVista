const firebase = require("../db");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = firebase.collection("products");

const addProduct = async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      productPrice,
      productDescription,
      productStock,
    } = req.body;

    console.log(req.body)

    const productRef = db.doc(productId.trim());
    await productRef.set({
      productId,
      productName,
      productPrice,
      productDescription,
      productStock,
    });
    res.status(201).send("Product added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllProducts = async (req, res, next) => {
    try {
      const productsSnapshot = await db.get();
      const products = [];
      productsSnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };


module.exports = {
  addProduct,
  getAllProducts
};
