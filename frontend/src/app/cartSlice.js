import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: {},
    cartQuantity: "",
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
