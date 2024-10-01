import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '../../utils/swiper';
import { activeSlide } from './utils/activeSlide';
import { activeSlideShuffle } from './utils/activeSlideShuffle';

import './index.scss';

const events = [
  'slide:add',
  'slide:next',
  'slide:previous',
  'slide:remove',
  'slides:clear',
  'slides:mode',
];

const html = `
  <div class="sliding" data-select="sliding">
    <div class="sliding__content" data-select="sliding-content">
    </div>
  </div>`;

export default function Sliding({
  slides = [],
  shuffleMode = false,
  slideSideSpacing = 0,
}) {
  Component.call(this, { html, events });
  this.slideIndex = 0;

  slides.forEach((item) => this.add(item));

  this.setShuffleMode(shuffleMode);
  if (slides.length > 1 && shuffleMode)
    this.setSlideSideSpacing(slideSideSpacing);

  const $sliding = this.selected.get('sliding');

  makeSwipable($sliding);

  this.swipeLeft = () => {
    this.next();
  };

  this.swipeRight = () => {
    this.previous();
  };

  this.listen('mount', () => {
    const slidingContent = Array.from(
      this.selected.get('sliding-content').children,
    );

    activeSlide(
      slidingContent,
      this.selected.get('sliding-content').children[0],
    );
    activeSlideShuffle(slidingContent, this.slideIndex);
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
    const slides = this.selected.get('sliding-content').children;

    this.slideIndex += 1;

    if (this.slideIndex > slides.length - 1) this.slideIndex = 0;

    const slide = slides[this.slideIndex];

    if (!this.shuffleMode) {
      const container = this.selected.get('sliding').clientWidth;
      this.selected.get('sliding-content').style.transform =
        `translateX(${-this.slideIndex * container}px)`;
      activeSlide(slides, slide);
    }

    activeSlideShuffle(slides, this.slideIndex);
    this.emit('slide:next', slide);
  },

  previous() {
    const slides = this.selected.get('sliding-content').children;

    this.slideIndex -= 1;

    if (this.slideIndex < 0) this.slideIndex = slides.length - 1;

    const slide = slides[this.slideIndex];

    if (!this.shuffleMode) {
      const container = this.selected.get('sliding').clientWidth;
      this.selected.get('sliding-content').style.transform =
        `translateX(${-this.slideIndex * container}px)`;
      activeSlide(slides, slide);
    }

    activeSlideShuffle(slides, this.slideIndex);
    this.emit('slide:previous', slide);
  },

  clear() {
    Array.from(this.selected.get('sliding-content').children).forEach((slide) =>
      this.remove(slide),
    );

    this.emit('slides:clear');
  },

  setSlideSideSpacing(slideSideSpacing = 0) {
    this.selected.get('sliding-content').style.padding =
      `0 ${slideSideSpacing}px`;
  },

  setShuffleMode(shuffleMode = false) {
    const $sliding = this.selected.get('sliding');

    this.shuffleMode = shuffleMode;

    $sliding.classList.toggle('sliding--shuffle', shuffleMode);

    this.emit('slides:mode', shuffleMode);
  },
});
