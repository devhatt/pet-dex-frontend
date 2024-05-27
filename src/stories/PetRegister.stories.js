import PetRegister from '../home/components/PetRegister';

// Configuração dos stories
export default {
  title: 'Pages/Pet',

  // Note que podemos receber argumentos
  render: (args = {}) => {
    const $container = document.createElement('div');
    const component = new PetRegister(args);
    component.mount($container);
    return $container;
  },
};

// Aqui criamos um story, passando os parametros que será injetado pela configuração
export const Default = {};
