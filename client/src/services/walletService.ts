import api from './api';

export const walletService = {
  getBalance: () => api.get('/wallet'),
  getTransactions: () => api.get('/wallet/transactions'),
  addCredits: (amount: number) => api.post('/wallet/add', { amount }),
};
