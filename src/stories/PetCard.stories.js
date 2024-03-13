import PetCard from '../components/PetCard';

import akita from '../home/components/PetRegisterPage/images/akita.svg';

export default {
  title: 'Components/PetCard',
  component: PetCard,
  render: (args) => {
    const $container = document.createElement('div');
    const card = new PetCard(args);
    card.mount($container);

    return $container;
  },
  argTypes: {
    title: { control: 'text', description: 'Breed name pet' },
    imgAlt: { control: 'text', description: 'breed alt description' },
    imgSrc: { control: akita, description: 'url source for a image pet' },
  },
};

export const Default = {
  args: {
    title: 'akita',
    imgAlt: 'breed alt description',
    imgSrc: akita,
  },
};
