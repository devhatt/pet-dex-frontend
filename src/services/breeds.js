/* eslint-disable no-console */
import { url } from './api';

export const BreedsService = {
  getBreeds: async () => {
    try {
      const response = await fetch(`${url}/breed`);

      if (!response.ok) {
        throw new Error({
          status: response.status,
          message: response.statusText,
        });
      }
      return await response.json();
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return error;
    }
  },
};
