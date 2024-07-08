export const UserService = {
  getPet: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição');
      }

      const { pets } = await response.json();
      return pets;
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: 'Status Error',
          issue: error.message,
        };
      }
      return error;
    }
  },
};
