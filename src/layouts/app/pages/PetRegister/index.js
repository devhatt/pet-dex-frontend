import { Component } from 'pet-dex-utilities';
import Button from '../../../../components/Button';
import PetCard from '../../../../components/PetCard';
import './index.scss';

const events = ['select:card', 'submit'];

const html = `
  <div class="breed-page">
    <div data-select="container" class="breed-page__breed-grid"></div>
    <div data-select="footer-container" class="breed-page__footer"></div>
  </div>
`;

export default function PetRegister({ cards = [] } = {}) {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');
  const $footerContainer = this.selected.get('footer-container');
  this.activeCard = null;

  const $button = new Button({
    text: 'Continuar',
    isFullWidth: false,
    isDisabled: true,
  });

  cards.forEach((data) => {
    const card = new PetCard(data);

    card.selected.get('pet-container').classList.add('pet-card');
    card.selected.get('pet-container').classList.toggle('pet-card--active');
    card.mount($container);

    card.listen('active', () => {
      if (this.activeCard) this.activeCard.deactivate();

      this.activeCard = card;
      this.emit('select:card', card);
      $button.enable();
    });

    card.listen('deactive', () => {
      $button.disable();
      this.activeCard = null;
    });
  });

  $button.listen('click', () => {
    this.emit('submit', this.breedSelect);
  });

  $button.selected.get('button').classList.add('breed-page__button');
  $button.mount($footerContainer);
}

PetRegister.prototype = Object.assign(
  PetRegister.prototype,
  Component.prototype,
);
