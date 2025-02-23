import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tablesReducer from "./tablesSlice";
import ordersReducer from "./orderSlice";
import productsReducer from "./productSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tables:tablesReducer,
    orders:ordersReducer,// Aquí el nombre debe coincidir con `name: "orders"` en el slice
    products:productsReducer
  },
});
