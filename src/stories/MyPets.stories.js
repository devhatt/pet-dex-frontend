import MyPets from '../components/MyPets';

export default {
  title: 'Components/MyPets',
  render: (args) => {
    const dropdown = new MyPets(args);
    const $container = document.createElement('div');
    dropdown.mount($container);

    return $container;
  },
};

export const Default = {};
