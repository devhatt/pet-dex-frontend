import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';
// import ProgressBar from '../../../components/ProgressBar';
import './index.scss';

const events = ['select:card', 'submit'];

const html = `
  <div>
    <div data-select="container" class="pet-regirested-page"></div>
    <div data-select="btn-container" class="pet-regirested-footer"></div>
  </div>
`;

export default function PetRegisterPage({ cards = [] } = {}) {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');
  const $btnContainer = this.selected.get('btn-container');
  this.activeCard = null;
  this.breedSelect = [];

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
      if (!this.activeCard) $button.disable();

      this.activeCard = card;
      this.breedSelect.push(card);
      this.emit('select:card', card);
      $button.enable();
    });

    card.listen('deactive', () => {
      this.breedSelect.pop();
      if (this.breedSelect.length === 0) {
        $button.disable();
      }
    });
  });

  $button.listen('click', () => {
    this.emit('submit', this.breedSelect);
    console.log('submit', this.breedSelect);
  });

  $button.selected.get('button').classList.add('pet-regirested-footer__button');
  $button.mount($btnContainer);
}

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
);
