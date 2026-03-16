import api from './api';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  university?: string;
}

export const authService = {
  login: (data: LoginPayload) => api.post('/auth/login', data),
  register: (data: RegisterPayload) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => axios.post('/api/auth/refresh-token', {}, { withCredentials: true }),
  getMe: (token: string) =>
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  verifyOtp: (email: string, otp: string) => api.post('/auth/verify-otp', { email, otp }),
};
