import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import PetCard from '../../../components/PetCard';

import './index.scss';

const html = `
    <div data-select="container" class="pet-regirested-page">
    </div>
`;

const events = ['select:card'];

export default function PetRegisterPage({ cards = [] } = {}) {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');

  const $button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: true,
  });

  const cardActive = null;

  cards.forEach((data) => {
    const card = new PetCard(data);
    card.selected
      .get('pet-container')
      .classList.add('pet-regirested-page__pet-card');
    card.mount($container);

    card.listen('active', () => {
      this.activeCard(cardActive);
      $button.enable();
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
        // console.log('enviando dados: ', card.elements);
      }
    });
  });

  $button.selected.get('button').classList.add('pet-regirested-page__button');
  $button.mount($container);
}
// TODO
/**
   *  1 - precisa de add card
      2 - remove card
      3 - active card
      4 - desactive card
      5 - current card ativo

      EVENTOS para mudança de card,
   */

PetRegisterPage.prototype = Object.assign(
  PetRegisterPage.prototype,
  Component.prototype,
  // {
  //   activeCard(cardActive) {
  //     if (cardActive !== null) {
  //       this.desactive(this);
  //     }

  //     cardActive = this;
  //     this.emit('select:card', this);
  //     console.log('active metodo');
  //   },

  //   desactive(cardActive) {
  //     if (cardActive === this) {
  //       cardActive = null;
  //     }
  //     console.log('desactive metodo');
  //   },
  // },
);
