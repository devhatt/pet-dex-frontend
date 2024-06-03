import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '../../utils/swiper';
import './index.scss';

const events = [
  'slide:add',
  'slide:next',
  'slide:previous',
  'slide:remove',
  'slides:clear',
];

const activeSlide = (slides, slide) => {
  Array.from(slides).forEach((item) => {
    item.classList.toggle('sliding__slide--active', item === slide);
  });
};

const html = `
  <div class="sliding" data-select="sliding">
    <div class="sliding__content" data-select="sliding-content">
    </div>
  </div>`;

export default function Sliding({ slides = [] }) {
  Component.call(this, { html, events });

  this.slideIndex = 0;

  slides.forEach((item) => this.add(item));

  const $sliding = this.selected.get('sliding');

  makeSwipable($sliding);

  this.swipeLeft = () => {
    this.next();
  };

  this.swipeRight = () => {
    this.previous();
  };

  this.listen('mount', () => {
    activeSlide(
      Array.from(this.selected.get('sliding-content').children),
      this.selected.get('sliding-content').children[0],
    );
    $sliding.addEventListener('swipe-left', this.swipeLeft());
    $sliding.addEventListener('swipe-right', this.swipeRight());
  });
  this.listen('unmount', () => {
    $sliding.removeEventListener('swipe-left', this.swipeLeft());
    $sliding.removeEventListener('swipe-right', this.swipeRight());
  });
}

Sliding.prototype = Object.assign(Sliding.prototype, Component.prototype, {
  add(slide) {
    slide.classList.add('sliding__slide');
    this.selected.get('sliding-content').appendChild(slide);

    this.emit('slide:add', slide);
  },

  remove(slide) {
    this.selected.get('sliding-content').removeChild(slide);

    this.emit('slide:remove', slide);
  },

  next() {
    this.slideIndex += 1;
    const slides = this.selected.get('sliding-content').children;

    if (this.slideIndex > slides.length - 1) this.slideIndex = 0;

    const slide = slides[this.slideIndex];
    const container = this.selected.get('sliding').clientWidth;
    this.selected.get('sliding-content').style.transform =
      `translateX(${-this.slideIndex * container}px)`;
    activeSlide(slides, slide);
    this.emit('slide:next', slide);
  },

  previous() {
    this.slideIndex -= 1;
    const slides = this.selected.get('sliding-content').children;

    if (this.slideIndex < 0) this.slideIndex = slides.length - 1;

    const slide = slides[this.slideIndex];
    const container = this.selected.get('sliding').clientWidth;

    this.selected.get('sliding-content').style.transform =
      `translateX(${-this.slideIndex * container}px)`;
    activeSlide(slides, slide);
    this.emit('slide:previous', slide);
  },

  clear() {
    Array.from(this.selected.get('sliding-content').children).forEach((slide) =>
      this.remove(slide),
    );

    this.emit('slides:clear');
  },
});
