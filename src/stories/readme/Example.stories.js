import Example from './Example';

// Configuração dos stories
export default {
  title: 'Examples/Example',

  // Note que podemos receber argumentos
  render: (args) => {
    const $container = document.createElement('div');
    const component = new Example(args);
    component.mount($container);
    return $container;
  },
};

// Aqui criamos um story, passando os parametros que será injetado pela configuração
export const Default = {};
