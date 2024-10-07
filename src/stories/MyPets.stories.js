import MyPets from '~src/components/MyPets';

export default {
  title: 'Components/MyPets',
  render: (args) => {
    const myPets = new MyPets(args);
    const $container = document.createElement('div');
    myPets.mount($container);

    return $container;
  },
};

export const Default = {
  args: {
    pets: [
      {
        name: 'Um super cachorro',
        gender: 'male',
        race: 'Border Collie',
        type: 'Cachorro',
        desc: 'Mistura marrom-escura-branca, com sobrancelhas claras e uma mancha em forma de coração na pata esquerda.',
      },
      {
        name: 'Tobias',
        gender: 'male',
        race: 'Border Collie',
        type: 'Cachorro',
        desc: 'Mistura marrom-escura-branca, com sobrancelhas claras e uma mancha em forma de coração na pata esquerda.',
      },
    ],
  },
};
