import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
import akita from './images/akita.svg';

import './index.scss';

const html = `
<div data-select="container"></div>
`;

export default function PetRegisterPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');
  const $petContainer = this.selected.get('container');

  this.petCard = new PetCard({
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  });

  this.button = new Button({
    text: 'Continuar',
    isFullWidth: false,
    isDisabled: false,
  });

  // this.petCard.selected.get('petCard').classList.add('pet-regirested-page__card');
  this.petCard.mount($petContainer);

  this.button.selected.get('button').classList.add('pet-regirested-page__button');
  this.button.mount($container);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
