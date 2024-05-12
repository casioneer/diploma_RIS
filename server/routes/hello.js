const router = require("express").Router();

router.route("/f").get(async (req, res) => {
    if (!req?.query?.text) { return res.status(400).json({ 'message': 'text is required' }) }
    const text = req.query.text;
    console.log(text);

    // get cart items
    // const cart = await cartService.getCart(userId);
    res.json({ field: "onetwo", yes: text });
});

module.exports = router;

