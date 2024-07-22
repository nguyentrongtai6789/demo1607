import { createAction, createSlice } from "@reduxjs/toolkit";
import { languages } from "../i18n/i18n";
import { handleLogin } from "./authActions";

interface IAuthState {
  loading: boolean;
  userInfo: any;
  userToken: string | null;
  language: keyof typeof languages;
}

export const initialState: IAuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: localStorage.getItem("userToken") || null,
  language: (localStorage.getItem("language") ||
    "en") as keyof typeof languages,
};

export const handleLogout = createAction("auth/handleLogout");

export const handleChangeLanguage = createAction<string>(
  "auth/handleChangeLanguage"
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state: IAuthState, action) => {
      localStorage.clear();
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
    },
    handleChangeLanguage: (state: IAuthState, action) => {
      localStorage.setItem("language", action.payload);
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state: IAuthState, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state: IAuthState, { payload }) => {
        state.loading = false;
        state.userToken = payload.userToken;
      })
      .addCase(handleLogin.rejected, (state: IAuthState, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
