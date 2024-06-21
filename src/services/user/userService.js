export const UserService = {
  getUser: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);

      if (!response.ok) {
        throw new Error('Ocorreu um erro');
      }

      const data = await response.json();
      return data.pets[0];
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
