import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
import afghanHound from './images/afghanHound.svg';
import akita from './images/akita.svg';
import beagle from './images/beagle.svg';
import bichonFrise from './images/bichonFrise.svg';
import borderCollie from './images/borderCollie.svg';
import boxer from './images/boxer.svg';
import chowChow from './images/chowChow.svg';
import mixedBreed from './images/mixedBreed.svg';

import './index.scss';

const html = `
    <div data-select="container" class="pet-regirested-page">
    </div>
`;

export default function PetRegisterPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

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

  cards.forEach((data) => {
    const card = new PetCard(data);
    card.selected.get('pet-container').classList.add('pet-regirested-page__pet-container');
    card.selected.get('pet-container').classList.toggle('pet-regirested-page__pet-container--active');
    card.mount($container);
  });

  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  this.button.selected.get('button').classList.add('pet-regirested-page__button');
  this.button.mount($container);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
