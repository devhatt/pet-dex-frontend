import PetVetPage from '../home/components/PetVetPage';

export default {
  title: 'Pages/PetVetPage',
  render: (args) => {
    const petVetPage = new PetVetPage(args);
    const $container = document.createElement('div');

    $container.style.height = '826px';
    $container.style.containerType = 'size';
    $container.style.overflow = 'auto';

    petVetPage.mount($container);

    return $container;
  },
  args: {
    vaccines: [
      {
        id: '1',
        veterinary: 'Dr octopus',
        title: 'Antirrábica',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        veterinary: 'Dr Felipa',
        title: 'Raiva',
        date: new Date(2023, 5, 2).toISOString(),
      },
      {
        id: '3',
        veterinary: 'Dr octopus',
        title: 'Raiva',
        date: new Date(2023, 2, 2).toISOString(),
      },
    ],
  },
  component: PetVetPage,
};

export const PetVetPageStory = {};
