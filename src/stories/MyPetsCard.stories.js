import MyPetsCard from '../components/MyPetsCard';

export default {
  title: 'Components/MyPetsCard',
  render: (args) => {
    const myPetsCard = new MyPetsCard(args);
    const $container = document.createElement('div');
    myPetsCard.mount($container);

    return $container;
  },
};

export const Default = {
  args: {
    name: 'Jake',
    gender: 'male',
    race: 'Border Collie',
    type: 'Cachorro',
    desc: 'Mistura marrom-escura-branca, com sobrancelhas claras e uma mancha em forma de coração na pata esquerda.',
  },
};
