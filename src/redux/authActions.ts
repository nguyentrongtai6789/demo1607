import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface IProps<T> {
  value: T;
  pathname: string;
}

interface IValues {
  code: string;
  clientId: string;
  lang: string;
  urlPrefix: string;
}

export const handleCheckAuth = createAsyncThunk(
  "login/action",
  async (data: IProps<IValues>, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8088/cccdApp/api/tw/users",
        data.value
      );
      if (res.status === 200) {
        return { ...res, pathname: data.pathname };
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
