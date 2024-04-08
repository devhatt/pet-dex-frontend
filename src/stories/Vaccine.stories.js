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
        vet: 'Dr octopus',
        vaccine: 'Antirrábica',
        date: new Date().toISOString(),
      },
      {
        vet: 'Dr Almeida',
        vaccine: 'Raiva',
        date: new Date(2023, 5, 2).toISOString(),
      },
      {
        vet: 'Dr octopus',
        vaccine: 'Raiva',
        date: new Date(2023, 2, 2).toISOString(),
      },
    ],
  },
};
