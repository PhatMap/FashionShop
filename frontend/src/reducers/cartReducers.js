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
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isAdded: action.payload,
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
      };

    case LOAD_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };

    case LOAD_CART_ITEMS_FAIL:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
