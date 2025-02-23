import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("token")
    ? { name: "Admin", token: localStorage.getItem("token") }
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
