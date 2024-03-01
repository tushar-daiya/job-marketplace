import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import studentApiSlice from "./features/api/studentApiSlice.js";
import companyApiSlice from "./features/api/companyApiSlice.js";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApiSlice.middleware,
      companyApiSlice.middleware
    ),
});

export default store;
