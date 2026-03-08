import api from './api';

export const profileService = {
  getProfile: (userId: string) => api.get(`/profile/${userId}`),
  updateProfile: (data: FormData | object) => api.put('/profile', data),
  uploadAvatar: (formData: FormData) =>
    api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
