const cartDb = require("../db/cart.db.js");
const {
  createCartDb,
  getCartDb,
  addItemDb,
  deleteItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
  emptyCartDb,
} = cartDb;
// Debug: ensure functions exist during development
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("cart.db exports:", Object.keys(cartDb));
}
const { ErrorHandler } = require("../helpers/error");

class CartService {
  createCart = async (userId) => {
    try {
      return await createCartDb(userId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  getCart = async (userId) => {
    try {
      return await getCartDb(userId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getCartById = async (cartId) => {
    try {
      return await cartDb.getCartByIdDb(cartId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addItem = async (data) => {
    try {
      return await cartDb.addItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  removeItem = async (data) => {
    try {
      return await cartDb.deleteItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  increaseQuantity = async (data) => {
    try {
      return await cartDb.increaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  decreaseQuantity = async (data) => {
    try {
      return await cartDb.decreaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  emptyCart = async (cartId) => {
    try {
      return await cartDb.emptyCartDb(cartId);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new CartService();
