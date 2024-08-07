import AddPet from '../components/AddPet';

export default {
  title: 'Components/AddPet',

  render: (args = {}) => {
    const $container = document.createElement('div');
    const component = new AddPet(args);
    component.mount($container);
    return $container;
  },
};

export const Default = {};
