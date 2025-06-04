import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shoppingCartReducer from "./shoppingCartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // lista de slices que persisten,
  whitelist: ["shoppingCart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          "persists/PERSISTS",
          "persists/REHYDRATE",
          "persists/PUSE",
          "persists/PURGE",
          "persists/REGISTER",
        ],
      },
    });
  },
  devTools: true,
});

export const persistor = persistStore(store);
