import { url } from './api';

export const UserService = {
  getPets: async (userId) => {
    try {
      const response = await fetch(`${url}/api/user/${userId}/my-pets`);

      if (!response.ok) {
        throw new Error('Failed request');
      }

      const { pets } = await response.json();
      return pets;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return `An error occurred: ${error}`;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${url}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Failed to login');

      const { token } = await response.json();
      return {
        success: true,
        token,
      };
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return {
        success: false,
        message: error.message,
      };
    }
  },

  registerUser: async (userData) => {
    try {
      const response = await fetch(`${url}/naoSeiARota`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
