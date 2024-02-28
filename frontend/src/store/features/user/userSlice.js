import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  type: "student" | "company",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("hello", action.payload);
      state.user = action.payload.user;
      state.type = action.payload.type;
    },
  },
});
export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export const selectType = (state) => state.type;
export default userSlice.reducer;
