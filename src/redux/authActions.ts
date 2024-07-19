import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ILoginPayload {
  username: string;
  password: string;
}

export const handleLogin = createAsyncThunk(
  "login/action",
  (values: ILoginPayload, { rejectWithValue }) => {
    try {
      if (values.username === "username" && values.password === "password") {
        localStorage.setItem("userToken", "agsldhalhds2398e3bjabsdl");
        return { pass: 1, userToken: "agsldhalhds2398e3bjabsdl" };
      } else {
        return { pass: 2, userToken: null };
      }
    } catch (error) {
      return rejectWithValue("Xảy ra lỗi");
    }
  }
);
