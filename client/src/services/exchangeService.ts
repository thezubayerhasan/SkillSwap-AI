import api from './api';

export const exchangeService = {
  getAll: () => api.get('/exchanges'),
  getById: (id: string) => api.get(`/exchanges/${id}`),
  create: (data: object) => api.post('/exchanges', data),
  updateStatus: (id: string, status: string) => api.patch(`/exchanges/${id}/status`, { status }),
};
