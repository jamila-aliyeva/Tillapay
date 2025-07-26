import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import convertationReducer from "./convertationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    convertation: convertationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
