import { AxiosResponse } from "axios";
import { Api } from "../api";
import { ResponseData } from "../types";

export interface IAuthResponse {
  token: string;
  id: number;
}

export class ApiUser extends Api {
  async getOneUsers(
    id: number
  ): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.get<ResponseData<IAuthResponse>>(
      `/user/${id}`
    );
    return response;
  }

  async getUsers(): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.get<ResponseData<IAuthResponse>>(`/user`);
    return response;
  }

  async postCreateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.post<ResponseData<IAuthResponse>>(
      "/user",
      {
        username: username,
        password: password,
        role: role
      }
    );
    return response;
  }

  async patchEditUser(
    id: number,
    username: string,
    password: string,
    role: string
  ): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.patch<ResponseData<IAuthResponse>>(
      `/user/${id}`,
      {
        username: username,
        password: password,
        role: role
      }
    );
    return response;
  }

  async deleteUsers(
    id: number
  ): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.delete<ResponseData<IAuthResponse>>(
      `/user/${id}`
    );
    return response;
  }
}
