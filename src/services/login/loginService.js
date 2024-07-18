function errorResponse(error) {
  return {
    success: false,
    message: error.message,
  };
}

function successResponse(data) {
  return {
    success: true,
    token: data.token,
  };
}

async function processLogin(email, password) {
  const url = 'http://localhost:3000/login';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Erro ao fazer o login');

  const data = await response.json();
  return successResponse(data);
}

export const LoginService = {
  login: async (email, password) => {
    try {
      return await processLogin(email, password);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
