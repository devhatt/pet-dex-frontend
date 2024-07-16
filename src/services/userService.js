import { url } from './api';

export const UserService = {
  getPets: async (userId) => {
    try {
      const response = await fetch(`${url}/${userId}`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição');
      }

      return response.json();
    } catch (error) {
      return `Ocorreu o seguinte erro: ${error}`;
    }
  },
};
