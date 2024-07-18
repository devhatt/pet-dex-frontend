import { url } from './api';

export const LoginService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Erro ao fazer o login');

      const data = await response.json();
      return {
        success: true,
        token: data.token,
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
