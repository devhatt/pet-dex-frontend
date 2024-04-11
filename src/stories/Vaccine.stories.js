import Vaccine from '../components/Vaccine';

export default {
  title: 'Components/Vaccine',

  render: (args) => {
    const $container = document.createElement('div');
    const toggle = new Vaccine(args);
    toggle.mount($container);

    return $container;
  },
  argTypes: {
    vaccinesList: { control: 'array', default: [] },
  },
};

export const Default = {
  args: {
    vaccinesList: [
      {
        id: '1',
        vet: 'Dr octopus',
        title: 'Antirrábica',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        vet: 'Dr Almeida',
        title: 'Raiva',
        date: new Date(2023, 5, 2).toISOString(),
      },
      {
        id: '3',
        vet: 'Dr octopus',
        title: 'Raiva',
        date: new Date(2023, 2, 2).toISOString(),
      },
    ],
  },
};
