import Axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export interface IError {
  code: string;
}

export class Api {
  public axios: AxiosInstance;

  constructor(baseURL: string) {
    const token = Cookies.get("token");

    this.axios = Axios.create({ baseURL });
    this.axios.defaults.timeout = 30000;
    this.axios.interceptors.request.use(config => {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      };
    });
  }

  onError(callback: (error: IError) => void): number {
    return this.axios.interceptors.response.use(undefined, error => {
      if (!error || !error.response || !error.response.data) {
        callback(error);
      }

      if (error.response?.status !== 400) {
        if (error.response?.data?.errors) {
          callback(error.response?.data?.errors);
        }
      }

      return Promise.reject(error);
    });
  }
}
