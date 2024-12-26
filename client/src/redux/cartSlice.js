import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeOneItemFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload
      );

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          const index = state.items.findIndex(
            (item) => item.productId === action.payload
          );
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, clearCart, removeOneItemFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
