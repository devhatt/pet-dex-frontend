const url = 'http://localhost:3000/';

export async function getBreeds() {
  try {
    const response = await fetch(`${url}breed`);

    if (!response.ok) {
      throw new Error('Ocorreu um erro na requisição');
    }
    return await response.json();
  } catch (error) {
    return `Ocorreu o seguinte erro: ${error}`;
  }
}
