const express = require("express");
const { addProduct } = require("../controllers/ProductController");
const { getAllProducts } = require("../controllers/ProductController");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);

module.exports = router;
