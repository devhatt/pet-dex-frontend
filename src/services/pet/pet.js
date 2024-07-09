import axios from 'axios';

export const PetService = {
  path: 'http://localhost:3000',

  getBreeds: async () => {
    try {
      const { data } = await axios.get(`${this.path}/pets/breeds`);
      return data;
    } catch (error) {
      return error;
    }
  },
};
