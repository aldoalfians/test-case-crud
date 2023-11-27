import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/authSlice";
import productsReducer from "../features/products/productSlice";
import categoryReducer from "../features/products/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
