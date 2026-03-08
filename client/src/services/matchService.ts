import api from './api';

export const matchService = {
  getMatches: () => api.get('/matches'),
  getMatchById: (id: string) => api.get(`/matches/${id}`),
};
