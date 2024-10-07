import { Component } from 'pet-dex-utilities';
import MyPetsCard from '../MyPetsCard';
import Sliding from '../Sliding';

import arrowLeft from './images/arrowLeft.svg';
import arrowRight from './images/arrowRight.svg';

import './index.scss';

const html = `
  <div class="my-pets">
   <button class="my-pets__button" data-select="button-previous">
    <img src=${arrowLeft}></img>
   </button>
   <div class="my-pets__cards-container" data-select="my-pets-cards-container"></div>
    <button class="my-pets__button" data-select="button-next">
      <img src=${arrowRight}></img>
   </button>
  </div>
`;

export default function MyPets({
  pets = [
    {
      name: '',
      gender: '',
      race: '',
      type: '',
      desc: '',
    },
  ],
}) {
  Component.call(this, { html });

  const $myPetsContainer = this.selected.get('my-pets-cards-container');
  const $previousButton = this.selected.get('button-previous');
  const $nextButton = this.selected.get('button-next');

  const cards = [];
  pets.forEach((pet) => {
    const petCard = new MyPetsCard(pet);
    const div = document.createElement('div');
    petCard.mount(div);
    cards.push(div);
  });
  const sliding = new Sliding({
    slides: cards,
    shuffleMode: true,
    slideSideSpacing: 80,
  });

  sliding.mount($myPetsContainer);

  $previousButton.onclick = () => {
    sliding.previous();
  };
  $nextButton.onclick = () => {
    sliding.next();
  };
}

MyPets.prototype = Object.assign(MyPets.prototype, Component.prototype, {});
