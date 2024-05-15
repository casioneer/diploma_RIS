const router = require("express").Router();

const product = require("./product");
const cart = require("./cart");
const users = require("./users")
const order = require("./order")

router.use("/product", product)
router.use("/cart", cart)
router.use("/users", users)
router.use("/orders", order)

module.exports = router;
