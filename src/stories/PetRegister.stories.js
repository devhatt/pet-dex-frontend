<<<<<<< HEAD
import PetRegister from '../layouts/app/pages/PetRegister';
=======
import PetRegister from '../layouts/app/pages/PetRegister/index';
>>>>>>> fa9dbb9 (feat: create register component initial structure)

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
