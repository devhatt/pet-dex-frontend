export const UserService = {
  getUser: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição');
      }

      const { name, pets } = await response.json();

      if (pets && pets.length > 0) {
        return pets;
      }
      return `${name} não possui pets.`;
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
