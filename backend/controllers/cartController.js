const Cart = require("../models/cart");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItems } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      cartItems,
    });
  } else {
    cart.cartItems.push(...cartItems);
    await cart.save();
  }

  let newCart;
  try {
    newCart = await Cart.findOne({ user: req.user.id });
  } catch (error) {
    console.error("Error finding cart:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }

  res.status(200).json({
    success: true,
    cart: newCart.cartItems,
  });
});

exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const cartItems = cart.cartItems;

  res.status(200).json({
    success: true,
    cartItems,
  });
});

exports.removeProductFromCart = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const updatedCartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== req.params.id
  );

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { cartItems: updatedCartItems } },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
