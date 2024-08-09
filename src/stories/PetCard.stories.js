import PetCard from '../components/PetCard';

import akita from './assets/petRegisterPage/akita.svg';

export default {
  title: 'Components/PetCard',
  render: (args) => {
    const $container = document.createElement('div');
    const card = new PetCard(args);
    card.mount($container);

    return $container;
  },
  argTypes: {
    title: { control: 'text', description: 'Breed name pet' },
    imgAlt: { control: 'text', description: 'breed alt description' },
    imgSrc: { control: 'text', description: 'url source for a image pet' },
  },
};

export const Default = {
  args: {
    title: 'akita',
    imgAlt: 'breed alt description',
    imgSrc: akita,
  },
};
