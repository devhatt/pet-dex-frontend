import { Component } from 'pet-dex-utilities';
import small from './images/small';
import medium from './images/medium';
import large from './images/large';

import './index.scss';

const events = ['size:change'];

const html = `
<div class="container-size-selector" role="radiogroup">
  <ul class="container-size-selector__size-list" data-select="size-list">
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

    <li class="container-size-selector__card container-size-selector__card--active" data-select="initial-card" role="radio" aria-checked="true" tabindex="0">
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
          <span class="container-size-selector__text">under 25kg</span>
        </div>
      </div>
    </li>
  </ul>
</div>
`;

export default function SizeSelector() {
  Component.call(this, { html, events });

  this.$sizeList = this.selected.get('size-list');
  this.$cards = this.$sizeList.querySelectorAll(
    '.container-size-selector__card',
  );
  this.$initialCard = this.selected.get('initial-card');

  this.listen('mount', () => {
    requestAnimationFrame(() => {
      this.$initialCard.scrollIntoView({
        inline: 'center',
        behavior: 'instant',
      });
    });
  });

  this.$cards.forEach((item, index) => {
    item.addEventListener('click', () => {
      this.setScroll(item);
      this.scrollEnd(item);
      this.emitCardEvent('click', item, index);
    });

    item.addEventListener('keydown', (event) => {
      this.handleKeyDown(event, item);
    });
  });
}

SizeSelector.prototype = Object.assign(
  SizeSelector.prototype,
  Component.prototype,
  {
    nextElement(next) {
      let nextIndex;
      if (next) {
        nextIndex = Array.from(this.$cards).indexOf(next);
        this.scrollEnd(next);
        this.emitCardEvent('keydown', next, nextIndex);
      }
    },

    handleKeyDown(event, card) {
      if (event.key === 'ArrowRight') {
        this.nextElement(card.nextElementSibling);
      }
      if (event.key === 'ArrowLeft') {
        this.nextElement(card.previousElementSibling);
      }
    },

    setScroll(card) {
      card.scrollIntoView({ inline: 'center' });
    },

    scrollEnd(card) {
      this.$sizeList.addEventListener('scrollend', () => {
        this.setActiveCard(card);
        card.focus();
      });
    },

    setActiveCard(element) {
      this.$cards.forEach((card) => {
        card.setAttribute('aria-checked', 'false');
        card.classList.remove('container-size-selector__card--active');
      });
      element.classList.add('container-size-selector__card--active');
      element.setAttribute('aria-checked', 'true');
    },

    emitCardEvent(eventName, card, index) {
      if (eventName === 'click') {
        this.emit('size:change', card, index);
      }
      if (eventName === 'keydown') {
        this.emit('size:change', card, index);
      }
    },

    activeCardInit() {
      const $activeCard = Array.from(this.$cards).find((element) =>
        element.classList.contains('container-size-selector__card--active'),
      );
      const indexCard = Array.from(this.$cards).findIndex((element) =>
        element.classList.contains('container-size-selector__card--active'),
      );
      return {
        card: $activeCard,
        index: indexCard,
      };
    },
  },
);
