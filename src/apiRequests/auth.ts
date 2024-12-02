import http from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
} from '@/schemaValidations/auth.schema';

const authApiRequest = {
  // 1. call qua BE
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  sLogout: (body: LogoutBodyType & { accessToken: string }) => {
    const { refreshToken, accessToken } = body;
    const payload = { refreshToken };

    return http.post('/auth/logout', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // 2. call qua server của NextJS
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: '',
    }),
  // vì server NextJS đã được config sẵn các token rồi và tự động gởi thông qua cookie nên không cần truyền gì cả
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }),
};

export default authApiRequest;
