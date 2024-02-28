import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import studentApiSlice from "./features/api/studentApiSlice.js";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApiSlice.middleware),
});

export default store;
