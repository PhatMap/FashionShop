import axios from "axios";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  SAVE_SHIPPING_INFO,
  LOAD_CART_ITEMS_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
} from "../constants/cartConstants";

export const getUserCart = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/v1/cart/me`);
    const { cartItems } = response.data;

    dispatch({
      type: LOAD_CART_ITEMS_SUCCESS,
      payload: cartItems,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemToCart =
  (id, quantity, size, colorName, colorHex) => async (dispatch, getState) => {
    try {
      // Fetch product details
      const { data } = await axios.get(`/api/v1/product/${id}`);

      // Construct item object
      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        quantity,
        sizes: size,
        colors: {
          colorName,
          colorHex,
        },
      };

      const { result } = await axios.post("/api/v1/cart", {
        cartItems: [item],
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: result.success,
      });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: "An error occurred while adding the item to the cart.",
      });
    }
  };

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(`/api/v1/cart/${id}`);

    dispatch({
      type: REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
