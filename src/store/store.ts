import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import paymentReducer from "./paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
