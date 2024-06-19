<<<<<<< HEAD
import PetWeightPage from '../layouts/app/pages/PetWeight';
=======
import PetWeightPage from '../layouts/app/pages/PetWeight/index';
>>>>>>> fa9dbb9 (feat: create register component initial structure)

export default {
  title: 'Pages/PetWeightPage',
  render: (args) => {
    const petWeightPage = new PetWeightPage(args);
    const $container = document.createElement('div');
    petWeightPage.mount($container);

    return $container;
  },
  args: {
    petPhoto: { control: 'string', default: 'https://via.placeholder.com/150' },
  },
  component: PetWeightPage,
};

export const PetWeightPageStory = {};
