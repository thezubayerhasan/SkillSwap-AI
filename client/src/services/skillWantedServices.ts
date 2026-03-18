import api from './api';

export const skillWantedService = {
  getMine: () => api.get('/skills-wanted'),

  getAll: (params?: object) =>
    api.get('/skills-wanted/all', { params }),

  getById: (id: string) =>
    api.get(`/skills-wanted/${id}`),

  create: (data: object) =>
    api.post('/skills-wanted', data),

  update: (id: string, data: object) =>
    api.put(`/skills-wanted/${id}`, data),

  delete: (id: string) =>
    api.delete(`/skills-wanted/${id}`)
};