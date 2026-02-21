import { createSlice } from "@reduxjs/toolkit";
const userSlices = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser(state, action) {
      return action.payload;
    },
    logout: (state) => {
      return null;
    },
  },
});
export const { addUser, logout } = userSlices.actions;
export default userSlices.reducer;
