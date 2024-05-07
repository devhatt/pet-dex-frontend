import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
import './index.scss';

const events = ['select:card', 'submit'];

const html = `
  <div class="breed-page-container">
    <div data-select="container" class="breed-page-container__breed-grid"></div>
    <div data-select="btn-container" class="pet-regirested-footer"></div>
  </div>
`;

export default function PetRegisterPage({ cards = [] } = {}) {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');
  const $btnContainer = this.selected.get('btn-container');
  this.activeCard = null;

  const $button = new Button({
    text: 'Continuar',
    isFullWidth: false,
    isDisabled: true,
  });

  cards.forEach((data) => {
    const card = new PetCard(data);

    card.selected
      .get('pet-container')
      .classList.add('pet-regirested-page__pet-card');
    card.selected
      .get('pet-container')
      .classList.toggle('pet-regirested-page__pet-card--active');
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

  $button.selected.get('button').classList.add('pet-regirested-footer__button');
  $button.mount($btnContainer);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
