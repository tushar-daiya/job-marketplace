import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import authApiSlice from "./features/api/authApiSlice.js";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export default store;
