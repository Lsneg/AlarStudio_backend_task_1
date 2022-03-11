import { ApiUser } from './api-routers/User';
import { ApiAuth } from './api-routers/Auth';

const router = '/api/v1/';

export const api = {
  ApiUser: new ApiUser(router),
  ApiAuth: new ApiAuth(router),
};
