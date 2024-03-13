import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
// import ProgressBar from '../../../components/ProgressBar';
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
  <div class="pet-regirested-page">
    <div data-select="container">
      <div class="pet-regirested-page__content">

      </div>
    </div>
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
      title: 'boxer',
      imgSrc: boxer,
      imgAlt: 'boxer',
    },
    {
      title: 'beagle',
      imgSrc: beagle,
      imgAlt: 'beagle',
    },
    {
      title: 'afghanHound',
      imgSrc: afghanHound,
      imgAlt: 'afghanHound',
    },
    {
      title: 'bichonFrise',
      imgSrc: bichonFrise,
      imgAlt: 'bichonFrise',
    },
    {
      title: 'chowChow',
      imgSrc: chowChow,
      imgAlt: 'chowChow',
    },
    {
      title: 'borderCollie',
      imgSrc: borderCollie,
      imgAlt: 'borderCollie',
    },
    {
      title: 'mixedBreed',
      imgSrc: mixedBreed,
      imgAlt: 'mixedBreed',
    },
  ];

  cards.forEach((data) => {
    const card = new PetCard(data);
    card.selected.get('pet-container').classList.add('pet-regirested-page__pet-container');
    card.mount($container);
  });

  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  this.button.mount($container);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
