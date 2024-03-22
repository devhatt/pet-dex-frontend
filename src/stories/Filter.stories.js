import Filter from '../components/Filter';

export default {
  title: 'Components/Filter',
  render: (args) => {
    const filter = new Filter(args);
    const $container = document.createElement('div');
    filter.mount($container);

    return $container;
  },
  argTypes: {
    boldText: { control: 'text', default: '' },
    regularText: { control: 'text', default: '' },
    inputPlaceholder: { control: 'text', default: '' },
  },
};

export const Default = {
  args: {
    endpoint: 'https://api.mock.com/v1/breeds',
    options: [
      {
        title: 'Raça',
        type: 'checkbox',
        values: ['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Outro'],
      },
      {
        title: 'Porte',
        type: 'radio',
        values: ['Pequeno', 'Médio', 'Grande'],
      },
    ],
  },
};
