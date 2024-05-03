import { Component } from 'pet-dex-utilities';
import './index.scss';
import { initializeSwiper, makeSwipable } from '../../utils/swiper';

const events = [
  'controls:change',
  'controls:disabled',
  'controls:enable',
  'item:add',
  'item:remove',
  'items:clear',
  'mode:change',
  'slide:change',
  'slide:next',
  'slide:previous',
];

const html = `
<div class="sliding" data-select="sliding">
  <button class="sliding__controls" data-select="previous-button">
    <svg class="sliding__controls__image" width="16" height="14" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="sliding__controls__image__path" d="M1.1665 6H12.8332M1.1665 6L6.1665 11M1.1665 6L6.1665 1" stroke="#1B85F3" stroke-width="1.5" stroke-linecap="round"   stroke-linejoin="round"/>
    </svg>
  </button>
  <div class="sliding__content" data-select="sliding-content">

  </div>
  <button class="sliding__controls" data-select="next-button">
    <svg class="sliding__controls__image width="16" height="14" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="sliding__controls__image__path" d="M1.16675 6H12.8334M12.8334 6L7.83341 11M12.8334 6L7.83341 1" stroke="#1B85F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>`;

export default function Slinding({
  items = [],
  loopMode = 'normal',
  controls = true,
} = {}) {
  Component.call(this, { html, events });

  this.loopMode = loopMode;
  this.controls = controls;
  this.items = [];

  items.forEach((item) => this.addItem(item));

  this.updateItems();

  this.setControls(controls);

  this.selected.get('previous-button').disabled =
    this.getLoopMode() === 'normal';

  makeSwipable(this.selected.get('sliding-content'));

  initializeSwiper();

  this.selected
    .get('sliding-content')
    .addEventListener('swipe-left', () => this.next());
  this.selected
    .get('sliding-content')
    .addEventListener('swipe-right', () => this.prev());

  this.selected
    .get('previous-button')
    .addEventListener('click', () => this.prev());

  this.selected.get('next-button').addEventListener('click', () => this.next());

  this.listen('mount', () =>
    document.addEventListener('click', this.setSlide(this.items[0])),
  );

  this.listen('unmount', () =>
    document.addEventListener('click', this.clearItems()),
  );

  this.getCurrentIndex = () =>
    this.items.findIndex((item) =>
      item.classList.contains('sliding__content__slide--selected'),
    );

  this.addNextAnimation = () => {
    const slide = this.getSlide();

    slide.classList.remove('sliding__content__slide__animation--prev');
    slide.classList.add('sliding__content__slide__animation--next');
  };

  this.addPrevAnimation = () => {
    const slide = this.getSlide();

    slide.classList.remove('sliding__content__slide__animation--next');
    slide.classList.add('sliding__content__slide__animation--prev');
  };

  this.updateStatusControls = () => {
    const currentIndex = this.getCurrentIndex();

    this.selected.get('previous-button').disabled = currentIndex === 0;

    this.selected.get('next-button').disabled =
      currentIndex === this.items.length - 1;

    this.emit('controls:disabled');
  };
}

Slinding.prototype = Object.assign(Slinding.prototype, Component.prototype, {
  addItem(item) {
    item.classList.add('sliding__content__slide');
    this.selected.get('sliding-content').appendChild(item);

    this.updateItems();

    this.emit('item:add', item);
  },

  removeItem(itemForRemove) {
    const itemExist = this.selected
      .get('sliding-content')
      .contains(itemForRemove);

    if (!itemExist) throw new Error('Item not exists');

    this.selected.get('sliding-content').removeChild(itemForRemove);

    this.updateItems();

    this.emit('item:remove', itemForRemove);
  },

  setSlide(item) {
    this.items.forEach((item2) => {
      if (item === item2) {
        item2.classList.add('sliding__content__slide--selected');
      } else {
        item2.classList.remove('sliding__content__slide--selected');
      }
    });

    if (this.getLoopMode() === 'normal') this.updateStatusControls();

    this.emit('slide:change', item);
  },

  getSlide() {
    return this.items.find((item) =>
      item.classList.contains('sliding__content__slide--selected'),
    );
  },

  next() {
    let currentIndex = this.getCurrentIndex();

    if (
      this.getLoopMode() === 'normal' &&
      currentIndex === this.items.length - 1
    )
      throw new Error('There are no next items');

    currentIndex = (currentIndex + 1) % this.items.length;
    this.setSlide(this.items[currentIndex]);

    this.addNextAnimation();

    this.emit('slide:next', this.items[currentIndex]);
  },

  prev() {
    let currentIndex = this.getCurrentIndex();

    if (this.getLoopMode() === 'normal' && currentIndex === 0)
      throw new Error('There are no prev items');

    if (currentIndex > 0) {
      currentIndex -= 1;
    } else {
      currentIndex = this.items.length - 1;
    }

    this.setSlide(this.items[currentIndex]);

    this.addPrevAnimation();

    this.emit('slide:previous', this.items[currentIndex]);
  },

  setControls(controls = true) {
    this.selected
      .get('previous-button')
      .classList.toggle('sliding__controls--removed', !controls);

    this.selected
      .get('next-button')
      .classList.toggle('sliding__controls--removed', !controls);

    this.controls = controls;

    this.emit('controls:change', this.controls);
  },

  getControls() {
    return this.controls;
  },

  setLoopMode(loopMode = '') {
    this.loopMode = loopMode;

    this.emit('mode:change', this.loopMode);
  },

  getLoopMode() {
    return this.loopMode;
  },

  clearItems() {
    this.items.forEach((item) => this.removeItem(item));

    this.emit('items:clear', this.items);
  },

  updateItems() {
    this.items = Array.from(this.selected.get('sliding-content').children);
  },
});
