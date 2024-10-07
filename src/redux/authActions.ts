import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface IProps {
  code: string;
  urlPrefix: string;
  clientId: string;
  lang: string;
}

export const handleCheckAuth = createAsyncThunk(
  "login/action",
  async (data: IProps, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8088/cccdApp/api/tw/users",
        data
      );
      if (res.status === 200) {
        return res;
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
      }
      if (error?.code === AxiosError.ERR_NETWORK) {
      }
      return error;
    }
  }
);
