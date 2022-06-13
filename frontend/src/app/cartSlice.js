import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [
      {
        category: 1,
        description: "Sony Xperia 10 descriptions. This is a new description.",
        id: 11,
        image: "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-10-1.jpg",
        name: "Sony Xperia 10",
        price: "599.00",
        quantity: 5,
        status: "published",
        amount: 3,
      },
      {
        category: 1,
        description: "Samsung Galaxy M53 descriptions.",
        id: 6,
        image:
          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m53-5g-1.jpg",
        name: "Samsung Galaxy M53",
        price: "1299.00",
        quantity: 5,
        status: "published",
        amount: 4,
      },
    ],
    amount: 1,
    total: "599.00",
    isLoading: true,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, { payload }) => {
      state.cartItems.push(payload);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
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
