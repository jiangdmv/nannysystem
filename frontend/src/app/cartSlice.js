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
      },
    ],
    amount: 1,
    total: "599.00",
    isLoading: true,
  },
  reducers: {
    updateCart: (state) => {
      state.product = {};
      state.cartQuantity = "";
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
