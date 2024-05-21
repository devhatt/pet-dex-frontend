import PetVetPage from '../home/components/PetVetPage';

export default {
  title: 'Pages/PetVetPage',
  render: (args) => {
    const petVetPage = new PetVetPage(args);
    const $container = document.createElement('div');
    petVetPage.mount($container);

    return $container;
  },
  args: {},
  component: PetVetPage,
};

export const PetVetPageStory = {};
