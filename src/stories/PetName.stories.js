import PetRegister from '~layouts/pages/PetName';

export default {
  title: 'Pages/PetName',

  render: (args = {}) => {
    const $container = document.createElement('div');
    const component = new PetRegister(args);
    component.mount($container);
    return $container;
  },
};

export const Default = {};
