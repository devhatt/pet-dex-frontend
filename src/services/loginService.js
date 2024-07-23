import { url } from './api';

export const LoginService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${url}/login`, {
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
};
