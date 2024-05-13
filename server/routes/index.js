const router = require("express").Router();

const product = require("./product");
const cart = require("./cart");

router.use("/product", product)
router.use("/cart", cart)

module.exports = router;
