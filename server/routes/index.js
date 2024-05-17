const router = require("express").Router();

const product = require("./product")
const cart = require("./cart")
const users = require("./users")
const order = require("./order")
const auth = require("./auth")
const payment = require("./payment")

router.use("/product", product)
router.use("/cart", cart)
router.use("/users", users)
router.use("/orders", order)
router.use("/auth", auth)
router.use("./payment", payment)

module.exports = router;
