const express = require("express");
const router = express.Router();

const { addToCart, getUserCart, removeProductFromCart } = require("../controllers/cartController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/cart").post(isAuthenticatedUser, addToCart);

router.route("/cart/me").get(isAuthenticatedUser, getUserCart);

router.route("/cart/:id").delete(isAuthenticatedUser, removeProductFromCart);

module.exports = router;
