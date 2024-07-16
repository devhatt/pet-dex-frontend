import { url } from '../api';

export const UserService = {
  getPets: async (userId) => {
    try {
      const response = await fetch(`${url}/${userId}`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição');
      }

      const { pets } = await response.json();
      return pets;
    } catch (error) {
      return `Ocorreu o seguinte erro: ${error}`;
    }
  },
};
