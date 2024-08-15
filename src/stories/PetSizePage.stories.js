import PetSize from '../layouts/app/pages/PetSize';

export default {
  title: 'Pages/PetSizePage',
  render: () => {
    const petSizePage = new PetSize();
    const $container = document.createElement('div');
    $container.style.display = 'flex';
    $container.style.height = '100vh';
    $container.style.justifyContent = 'center';
    petSizePage.mount($container);

    return $container;
  },
  component: PetSize,
};

export const PetSizePageStory = {};
