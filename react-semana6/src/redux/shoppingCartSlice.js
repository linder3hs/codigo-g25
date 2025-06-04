import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      // buscamos si el producto existe
      const searchedProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!searchedProduct) {
        // no existe
        action.payload.quantity = 1;
        state.products.push(action.payload);
      }
    },
  },
});

export const { addProductToCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
