import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const last_user_name = localStorage.getItem("user_name");
const last_user_cart = JSON.parse(
  localStorage.getItem(last_user_name + "Cart")
);
const cartItems2 = localStorage.getItem("cartItems");

//JSON.parse(localStorage.getItem("cartItems")) ||

// let cart = {
//   user: user_name,
//   cartItems: JSON.stringify(cartItems),
//   amount: amount,
//   total: total,
// };
// localStorage.setItem(user_name + "Cart", JSON.stringify(cart));
// localStorage.setItem("cartItems", JSON.stringify(cartItems));
// localStorage.setItem("amount", amount);
// localStorage.setItem("total", total);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem(last_user_cart.cartItems)) || [],
    amount: localStorage.getItem(last_user_cart.amount) || 0,
    total: localStorage.getItem(last_user_cart.total) || "0",
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
    loginCart: (state, { payload }) => {
      const amount = payload.amount;
      const total = payload.total;
      state.amount = amount;
      state.total = total;
      const cartItems = JSON.parse(payload.cartItems);
      state.cartItems.push.apply(state.cartItems, cartItems);
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
      console.log(amount);
      console.log(total);
    },
    isLoadingComplete: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  addToCart,
  removeItem,
  loginCart,
  increase,
  decrease,
  calculateTotals,
  isLoadingComplete,
} = cartSlice.actions;
export default cartSlice.reducer;
