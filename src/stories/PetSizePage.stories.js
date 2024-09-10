import PetSize from '~layouts/pages/PetSize';

export default {
  title: 'Pages/PetSizePage',
  render: () => {
    const petSizePage = new PetSize();
    const $container = document.createElement('div');
    petSizePage.mount($container);

    return $container;
  },
  component: PetSize,
};

export const PetSizePageStory = {};
