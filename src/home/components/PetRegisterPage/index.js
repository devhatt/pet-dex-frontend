import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
import './index.scss';

const events = ['select:card', 'submit-breed'];

const html = `
    <div data-select="container" class="pet-regirested-page">
    </div>
`;

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
      .classList.add('pet-regirested-page__pet-container');
    card.selected
      .get('pet-container')
      .classList.toggle('pet-regirested-page__pet-container--active');
    card.mount($container);

    card.listen('active', () => {
      if (!this.activeCard) button.disable();

      this.activeCard = card;
      this.emit('select:card', card);
      button.enable();
    });

    card.listen('desactive', () => {
      this.desactive(cardActive);
      $button.disable();
    });

    $button.listen('click', () => {
      const cardSelect = card.selected
        .get('pet-container')
        .classList.contains('pet-container--active');

      if (cardSelect) {
        console.log(
          'submit dados',
          cardSelect,
          card.selected.get('pet-container'),
        );
      }
    });
  });

  button.listen('click', () => {
    this.emit('submit-breed', this.activeCard);
  });

  button.selected.get('button').classList.add('pet-regirested-page__button');
  button.mount($container);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
