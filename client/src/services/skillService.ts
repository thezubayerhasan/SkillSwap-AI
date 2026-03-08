import api from './api';

export const skillService = {
  getAll: (params?: object) => api.get('/skills', { params }),
  getById: (id: string) => api.get(`/skills/${id}`),
  create: (data: object) => api.post('/skills', data),
  update: (id: string, data: object) => api.put(`/skills/${id}`, data),
  delete: (id: string) => api.delete(`/skills/${id}`),
};
