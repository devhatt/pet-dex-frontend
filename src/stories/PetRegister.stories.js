import PetRegister from '../layouts/app/pages/PetRegister';

export default {
  title: 'Pages/PetProfile',

  render: (args = {}) => {
    const $container = document.createElement('div');
    const component = new PetRegister(args);
    component.mount($container);
    return $container;
  },
};

export const Default = {};
