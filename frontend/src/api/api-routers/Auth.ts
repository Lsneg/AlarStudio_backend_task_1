import { AxiosResponse } from 'axios';
import { Api } from '../api';
import { ResponseData } from '../types';

export interface IAuthResponse {
  token: string;
  id: number;
}

export interface IAuthData {
  username: string;
  password: string;
}

export class ApiAuth extends Api {
  async postAuth(authData: IAuthData): Promise<AxiosResponse<ResponseData<IAuthResponse>>> {
    const response = await this.axios.post<ResponseData<IAuthResponse>>("/auth/login", authData);
    return response;
  }
}
