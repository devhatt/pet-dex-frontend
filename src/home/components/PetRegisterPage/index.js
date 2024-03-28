import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';

import './index.scss';

const html = `
    <div data-select="container" class="pet-regirested-page">
    </div>
`;

const events = ['select:card', 'submit-pet'];

export default function PetRegisterPage({ cards = [] } = {}) {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');
  this.activeCard = null;

  const button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: true,
  });

  cards.forEach((data) => {
    const card = new PetCard(data);

    card.selected
      .get('pet-container')
      .classList.add('pet-regirested-page__pet-card');
    card.mount($container);

    card.listen('active', () => {
      if (this.activeCard === null) {
        button.disable();
      }

      this.activeCard = card;
      this.emit('select:card', card);
      button.enable();
    });

    card.listen('desactive', () => {
      button.disable();
    });
  });

  button.listen('click', () => {
    this.emit('submit-pet', this.activeCard);
  });

  button.selected.get('button').classList.add('pet-regirested-page__button');
  button.mount($container);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
