import PetAvatar from '../components/PetAvatar';

import akita from '../home/components/PetRegisterPage/images/akita.svg';

export default {
  title: 'Components/PetAvatar',
  render: (args) => {
    const $container = document.createElement('div');
    const petAvatar = new PetAvatar(args);
    petAvatar.mount($container);

    return $container;
  },
  argTypes: {
    title: { control: 'text', description: 'Pet name' },
    imgSrc: { control: 'text', description: 'url source for a image pet' },
    imgAlt: { control: 'text', description: 'Pet name alt description' },
  },
};

export const Default = {
  args: {
    title: 'Carlos',
    imgSrc: akita,
    imgAlt: 'breed alt description',
  },
};
