import { Component } from 'pet-dex-utilities';
import small from './images/small';
import medium from './images/medium';
import large from './images/large';

import './index.scss';

const events = ['event'];

const html = `
<div class="container-size-selector" role="radiogroup">
  <ul class="container-size-selector__size-list" data-select="sizelist">
    <li class="container-size-selector__card" role="radio" aria-checked="false" tabindex="0">
      <div class="container-size-selector__card-size">
        <div class="container-size-selector__container-img">
          ${small}
        </div>
        <div class="container-size-selector__container-text">
          <h3 class="container-size-selector__title">Small</h3>
          <span class="container-size-selector__text">under 14kg</span>
        </div>
      </div>
    </li>

    <li class="container-size-selector__card container-size-selector__card--active" data-select="card-active" role="radio" aria-checked="true" tabindex="0">
      <div class="container-size-selector__card-size">
        <div class="container-size-selector__container-img">
          ${medium}
        </div>
        <div class="container-size-selector__container-text">
          <h3 class="container-size-selector__title">Medium</h3>
          <span class="container-size-selector__text">14-25kg</span>
        </div>
      </div>
    </li>

    <li class="container-size-selector__card" role="radio" aria-checked="false" tabindex="0">
      <div class="container-size-selector__card-size">
        <div class="container-size-selector__container-img">
          ${large}
        </div>
        <div class="container-size-selector__container-text">
          <h3 class="container-size-selector__title">Large</h3>
          <span class="container-size-selector__text">over 25kg</span>
        </div>
      </div>
    </li>
  </ul>
</div>
`;

export default function SizeSelector() {
  Component.call(this, { html, events });

  this.$sizeList = this.selected.get('sizelist');
  this.$cards = Array.from(
    this.$sizeList.querySelectorAll('.container-size-selector__card'),
  );

  const addEventListeners = (card, index) => {
    card.addEventListener('click', () => {
      this.selectCard(card, index);
      this.emitCardEvent('click', card, index);
    });

    card.addEventListener('keydown', (key) => {
      this.handleKeyDown(key, card);
    });
  };

  this.$cards.forEach((card, index) => addEventListeners(card, index));
}

SizeSelector.prototype = Object.assign(
  SizeSelector.prototype,
  Component.prototype,
  {
    nextElement(next) {
      let nextIndex;
      if (next) {
        nextIndex = this.$cards.indexOf(next);
        next.focus();
        this.selectCard(next, nextIndex);
        this.emitCardEvent('keydown', next, nextIndex);
      }
    },

    handleKeyDown(event, card) {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = card.nextElementSibling;
        this.nextElement(next);
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        next = card.previousElementSibling;
        this.nextElement(next);
      }
    },

    selectCard(selected, index) {
      this.setActiveCard(selected, 'container-size-selector__card--active');
      this.centerCard(selected, index);
    },

    centerCard(card, index) {
      if (index === 0) {
        this.$sizeList.classList.add(
          'container-size-selector__size-list--active-padding',
        );
      }

      const cardRect = card.getBoundingClientRect();
      const listRect = this.$sizeList.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const listCenter = listRect.left + listRect.width / 2;
      const offset = cardCenter - listCenter;

      this.$sizeList.scrollBy({
        left: offset,
        behavior: 'smooth',
      });
    },

    setActiveCard(element, className) {
      this.$cards.forEach((card) => {
        card.setAttribute('aria-checked', 'false');
        card.classList.remove(className);
      });
      element.classList.add(className);
      element.setAttribute('aria-checked', 'true');
    },

    emitCardEvent(eventName, card, index) {
      if (eventName === 'click') {
        this.emit('event', card, index);
      }
      if (eventName === 'keydown') {
        this.emit('event', card, index);
      }
    },

    getActiveCard() {
      const $activeCard = this.$cards.find((element) =>
        element.classList.contains('container-size-selector__card--active'),
      );
      const indexCard = this.$cards.findIndex((element) =>
        element.classList.contains('container-size-selector__card--active'),
      );
      return {
        card: $activeCard,
        index: indexCard,
      };
    },
  },
);
