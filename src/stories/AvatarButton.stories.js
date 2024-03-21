import AvatarButton from '../components/AvatarButton';

// Configuração dos stories
export default {
  title: 'Components/AvatarButton',

  // Note que podemos receber argumentos
  render: (args) => {
    const $container = document.createElement('div');
    const component = new AvatarButton(args);
    component.mount($container);
    return $container;
  },
};

// Aqui criamos um story, passando os parametros que será injetado pela configuração
export const Default = {};
