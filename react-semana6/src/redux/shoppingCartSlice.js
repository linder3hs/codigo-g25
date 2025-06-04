import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const findProductById = (products, productId) => {
  return products.products.find((product) => product.id === productId);
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      // buscamos si el producto existe
      const searchedProduct = findProductById(state, action.payload.id);

      if (!searchedProduct) {
        // no existe
        action.payload.quantity = 1;
        state.products.push(action.payload);
      }
    },
    // function para sumar 1 a la cantidad
    incrementProductQuantity: (state, action) => {
      const searchedProduct = findProductById(state, action.payload.id);
      // si existe
      if (searchedProduct) {
        searchedProduct.quantity++;
      }
    },
    // function para restar 1 a la cantidad
    // funcion para eliminar el producto del carrito
  },
});

export const { addProductToCart, incrementProductQuantity } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
