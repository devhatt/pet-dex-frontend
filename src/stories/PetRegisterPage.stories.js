import PetRegisterPage from '../home/components/PetRegisterPage';

import afghanHound from '../home/components/PetRegisterPage/images/afghanHound.svg';
import akita from '../home/components/PetRegisterPage/images/akita.svg';
import beagle from '../home/components/PetRegisterPage/images/beagle.svg';
import bichonFrise from '../home/components/PetRegisterPage/images/bichonFrise.svg';
import borderCollie from '../home/components/PetRegisterPage/images/borderCollie.svg';
import boxer from '../home/components/PetRegisterPage/images/boxer.svg';
import chowChow from '../home/components/PetRegisterPage/images/chowChow.svg';
import mixedBreed from '../home/components/PetRegisterPage/images/mixedBreed.svg';

const cards = [
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Beagle',
    imgSrc: beagle,
    imgAlt: 'beagle',
  },
  {
    title: 'Afghan Hound',
    imgSrc: afghanHound,
    imgAlt: 'afghan hound',
  },
  {
    title: 'Bichon Frise',
    imgSrc: bichonFrise,
    imgAlt: 'bichon frise',
  },
  {
    title: 'Chow Chow',
    imgSrc: chowChow,
    imgAlt: 'chow chow',
  },
  {
    title: 'Border Collie',
    imgSrc: borderCollie,
    imgAlt: 'border collie',
  },
  {
    title: 'Mixed Breed',
    imgSrc: mixedBreed,
    imgAlt: 'mixed breed',
  },
];

export default {
  title: 'Pages/PetRegister',
  render: (args = {}) => {
    const card = new PetRegisterPage(args);
    const $container = document.createElement('div');
    $container.style.height = '610px';
    card.mount($container);

    return $container;
  },
};

export const Default = {
  args: {
    cards,
  },
};
