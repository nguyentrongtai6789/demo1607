import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import NotificationCustom from "../customAntd/NotificationCustom";
export interface ILoginPayload {
  username: string;
  password: string;
}

export const handleLogin = createAsyncThunk(
  "login/action",
  async (values: ILoginPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", values);
      if (res.status === 200) {
        NotificationCustom("login successfully", "success");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        NotificationCustom("wrong password or username", "error");
      }
      if (error?.code === AxiosError.ERR_NETWORK) {
        NotificationCustom("network error", "error");
      }
    }
  }
);
