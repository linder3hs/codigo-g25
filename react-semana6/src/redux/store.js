import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shoppingCartReducer from "./shoppingCartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
  },
});
