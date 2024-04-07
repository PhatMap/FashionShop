import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  SAVE_SHIPPING_INFO,
  LOAD_CART_ITEMS_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} }, // Initialize error property
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        isAdded: action.payload.success,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        isRemoved: action.payload,
        error: null, // Clear error on successful action
      };

    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
        error: null, // Clear error on successful action
      };

    case LOAD_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        error: null, // Clear error on successful action
      };

    case LOAD_CART_ITEMS_FAIL:
      return {
        ...state,
        error: action.payload, // Structure error payload as an object
      };

    default:
      return state;
  }
};
