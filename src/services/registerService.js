import { url } from './api';

export const registerUser = async (userData) => {
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
};
