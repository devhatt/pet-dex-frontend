const URL = 'http://localhost:3000/user';

export async function PetService() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('Ocorreu um erro');
    }

    const data = await response.json();
    return data[0].pets[0];
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: 'Status Error',
        issue: error.message,
      };
    }
    return error;
  }
}

PetService();
