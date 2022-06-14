import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    amount: 0,
    total: "599.00",
    isLoading: true,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info("Increased product quantity", {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...payload, cartQuantity: 1 };
        console.log("tmpProduct");
        console.log(tempProduct);
        toast.success("Added a new product to cart.", { position: "top-left" });
        state.cartItems.push(tempProduct);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      toast.info("The product has been removed.", {
        position: "top-left",
      });
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.cartQuantity = cartItem.cartQuantity + 1;
      toast.info("Increased product quantity", {
        position: "top-left",
      });
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem.cartQuantity > 1) {
        cartItem.cartQuantity = cartItem.cartQuantity - 1;
        toast.info("Decreased product quantity", {
          position: "top-left",
        });
      } else {
        cartItem.cartQuantity = 0;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.cartQuantity;
        total += item.cartQuantity * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  clearCart,
  addToCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
