import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "./authActions";

interface IAuthState {
  loading: boolean;
  userInfo: any;
  userToken: string | null;
}

export const initialState: IAuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: localStorage.getItem("userToken") || null,
};

export const handleLogout = createAction("auth/handleLogout");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state: IAuthState, action) => {
      localStorage.clear();
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state: IAuthState, action) => {
        state.loading = true;
        console.log(action);
      })
      .addCase(handleLogin.fulfilled, (state: IAuthState, { payload }) => {
        state.loading = false;
        state.userToken = payload.userToken;
        console.log(payload);
      })
      .addCase(handleLogin.rejected, (state: IAuthState, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export default authSlice.reducer;
