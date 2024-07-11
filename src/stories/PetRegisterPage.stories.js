import PetRegisterPage from '../layouts/app/pages/PetRegister';

import afghanHound from './assets/petRegisterPage/afghanHound.svg';
import akita from './assets/petRegisterPage/akita.svg';
import beagle from './assets/petRegisterPage/beagle.svg';
import bichonFrise from './assets/petRegisterPage/bichonFrise.svg';
import borderCollie from './assets/petRegisterPage/borderCollie.svg';
import boxer from './assets/petRegisterPage/boxer.svg';
import chowChow from './assets/petRegisterPage/chowChow.svg';
import mixedBreed from './assets/petRegisterPage/mixedBreed.svg';

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
