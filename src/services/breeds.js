/* eslint-disable no-console */
const url = 'http://localhost:3000';

export const BreedsService = {
  getBreeds: async () => {
    try {
      const response = await fetch(`${url}/breed`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição');
      }
      return await response.json();
    } catch (error) {
      console.error(`Ocorreu o seguinte erro: ${error}`);
      return error;
    }
  },
};
