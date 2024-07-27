import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

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
        if (error?.response?.status === 401) {
          // NotificationCustom(
          //   "Thông tin đăng nhập hết hạn, vui lòng đăng nhập lại",
          //   "error"
          // );
        }
        if (error?.code === AxiosError.ERR_NETWORK) {
          // NotificationCustom("Lỗi kết nối mạng", "error");
        }
        return Promise.reject(error);
      }
    );
    this.attachTokenToHeader("");
  }

  //gắn token vào header request:
  attachTokenToHeader(token: string) {
    const tokenTest =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzMxODYwMDY2NjYiLCJkb252aSI6eyJpZCI6MywibG9naW4iOiIwMzMxODYwMDY2NjYiLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6bnVsbCwiYWN0aXZhdGVkIjp0cnVlLCJsYW5nS2V5IjpudWxsLCJpbWFnZVVybCI6bnVsbCwiZGlhQ2hpbmhJZCI6MSwibG9haVRrIjpudWxsLCJkb25WaUlkIjoxMTcyOCwiY2FuQm9JZCI6MywicGhvbmdCYW5JZCI6bnVsbCwiY2FwWHVMeSI6IlciLCJ0ZW5Eb25WaSI6IkPhu6VjIEPhuqNuaCBzw6F0IFFMSEMgduG7gSBUVFhIIFThuqFpIFRXIEjDoCBO4buZaSIsInRlbkNhbkJvIjoiQ8OhbiBi4buZIEEiLCJxdWFuTHkiOiJOIiwidHJ1eUNhcElkIjoxMjQ1NiwibWVzc2FnZSI6bnVsbCwiYWxsb3dEbFRvS2hhaSI6dHJ1ZSwiYWxsb3dEbENkQ2NjZCI6dHJ1ZSwiYWxsb3dEbER0Q2NjZCI6dHJ1ZSwiYWxsb3dEbENkRGFuQ3UiOnRydWUsImFsbG93RGxEdERhbkN1Ijp0cnVlLCJjaHVjVnUiOiJjw6FuIGLhu5kgIiwiYWRtaW4iOnRydWV9LCJleHAiOjIwMzY3NDEzMjB9.QO69BBgdMIlMP2RTV1UsBWpIOoZncEj5OLyj0V2eAzML7hpF_MB2KlvbnGkOtYn5tzuJSUSgO9FjmJFYllE0Cw";
    this.axios.interceptors.request.use(function (config: any) {
      config.headers.Authorization = `Bearer ${tokenTest}`;
      return config;
    });
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
        .then((response) => resolve(response))
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
