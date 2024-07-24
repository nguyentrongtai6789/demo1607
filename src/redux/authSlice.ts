import { createAction, createSlice } from "@reduxjs/toolkit";
import { languages } from "../i18n/i18n";
import { handleLogin } from "./authActions";
import httpMethod from "../config/httpMethod";

interface IAuthState {
  loading: boolean;
  userInfo: any;
  userToken: string | null;
  language: keyof typeof languages;
  countLoading: number;
}

export const initialState: IAuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: localStorage.getItem("userToken") || null,
  language: (localStorage.getItem("language") ||
    "en") as keyof typeof languages,
  countLoading: 0,
};

export const handleLogout = createAction("auth/handleLogout");

export const handleChangeLanguage = createAction<string>(
  "auth/handleChangeLanguage"
);

export const handleLoading = createAction("auth/handleLoading");

export const loadingCancel = createAction("auth/loadingCancel");

export const loginSuccess = createAction<any>("auth/loginSuccess");

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
    handleLoading: (state: IAuthState, action) => {
      state.loading = true;
      state.countLoading = state.countLoading + 1;
    },
    loadingCancel: (state: IAuthState, action) => {
      state.countLoading = state.countLoading - 1;
      if (state.countLoading === 0) {
        state.loading = false;
      }
    },
    loginSuccess: (state: IAuthState, action) => {
      localStorage.setItem("userToken", action.payload.token);
      state.userInfo = action.payload;
      state.userToken = action.payload.token;
      httpMethod.attachTokenToHeader(action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state: IAuthState, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state: IAuthState, { payload }) => {
        state.loading = false;
        // state.userToken = payload.userToken;
      })
      .addCase(handleLogin.rejected, (state: IAuthState, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
