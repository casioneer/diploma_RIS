const router = require("express").Router();

const hello = require("./hello");
const huynya = require("./huynya");
const product = require("./product");
const cart = require("./cart")

router.use("/hello", hello)
router.use("/huynya", huynya)
router.use("/product", product)
router.use("/cart", cart)

module.exports = router;
