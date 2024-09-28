import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import NotificationCustom from "../customAntd/NotificationCustom";
import { lang } from "moment";

export const URL = process.env.REACT_APP_API_DEMO;

export const URL_AUTH = process.env.REACT_APP_API_AUTH;

class Services {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: URL,
      timeout: 60000,
    });
    this.axios.interceptors.response.use(
      function (response: AxiosResponse) {
        return Promise.resolve(response);
      },
      function (error: AxiosError) {
        const language = localStorage.getItem("language");
        //các lỗi chung sẽ bắt ở đây
        //token hết hạn
        if (error?.response?.status === 401) {
          setTimeout(() => {
            window.location.href = `${process.env.PUBLIC_URL}/login`;
          }, 1500);
          switch (language) {
            case "vi":
              return NotificationCustom(
                "Thông tin đăng nhập hết hạn, vui lòng đăng nhập lại!",
                "error"
              );
            case "en":
              return NotificationCustom(
                "Login information expired, please login again!",
                "error"
              );
            case "la":
              return NotificationCustom(
                "ຂໍ້ມູນການເຂົ້າສູ່ລະບົບໝົດອາຍຸແລ້ວ, ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງ!",
                "error"
              );
          }
        }
        //notfound
        if (error?.response?.status === 404) {
          switch (language) {
            case "vi":
              return NotificationCustom("Không tìm thấy địa chỉ api", "error");
            case "en":
              return NotificationCustom("Not found api", "error");
            case "la":
              return NotificationCustom(
                "ບໍ່ພົບທີ່ຢູ່ API ແມ່ນເທັກກາກລາວ",
                "error"
              );
          }
        }
        //network error
        if (error?.code === AxiosError.ERR_NETWORK) {
          switch (language) {
            case "vi":
              return NotificationCustom(
                "Không thể kết nối đến máy chủ",
                "error"
              );
            case "en":
              return NotificationCustom("Network error", "error");
            case "la":
              return NotificationCustom("ຜິດ​ພາດ​ຄວາ​ມຄືນ​ເອ​ີ້ນ", "error");
          }
        }
        return Promise.reject(error);
      }
    );
    this.attachTokenToHeader();
  }

  //gắn token vào header request:
  public attachTokenToHeader() {
    const token = localStorage.getItem("userToken");

    const tokenTestXuatFile =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzMxODYwMDY2NjYiLCJkb252aSI6eyJpZCI6MTAwMDIyOCwibG9naW4iOiIwMzMxODYwMDY2NjYiLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6bnVsbCwiYWN0aXZhdGVkIjp0cnVlLCJsYW5nS2V5IjpudWxsLCJpbWFnZVVybCI6bnVsbCwiZGlhQ2hpbmhJZCI6MSwibG9haVRrIjpudWxsLCJkb25WaUlkIjoxMTcyOCwiY2FuQm9JZCI6MTI4OSwicGhvbmdCYW5JZCI6ODEsImNhcFh1THkiOiJXIiwidGVuRG9uVmkiOiJD4bulYyBD4bqjbmggc8OhdCBRTEhDIHbhu4EgVFRYSCBU4bqhaSBUVyBIw6AgTuG7mWkiLCJ0ZW5DYW5CbyI6Ik5ndXnhu4VuIFRo4buLIFRow7l5IiwicXVhbkx5IjoiTiIsInRydXlDYXBJZCI6MTQyNzYyODgsIm1lc3NhZ2UiOm51bGwsImFkbWluIjp0cnVlfSwiZXhwIjoxNzI3NTE2MTcwfQ.tlyEycmVNP6wN4e7311_9S1jPoZFjwiHPTnnWW6zouuVicSM_o5YtrMUcNxVO6EZPHr_nO-gn7hNqXTw7XpvCA";

    this.axios.interceptors.request.use(
      function (config: any) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
  }

  public get<T = any, R = T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get<T, AxiosResponse<R>, D>(url, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  public post<D, R>(
    url: string,
    data?: D,
    config: any = {}
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post<D, AxiosResponse<R>>(url, data, config)
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public put<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public delete<D = any, R = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .delete<D, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }
}

export default new Services();
