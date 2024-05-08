import { Component } from 'pet-dex-utilities';
import './index.scss';
import { initializeSwiper, makeSwipable } from '../../utils/swiper';

const events = [];

const html = `
<div class="sliding">
  <div class="sliding__content" data-select="sliding-content">
    <div class="sliding__content__slide">1</div>
    <div class="sliding__content__slide">2</div>
    <div class="sliding__content__slide">3</div>
    <div class="sliding__content__slide">4</div>
    <div class="sliding__content__slide">5</div>
  </div>
</div>`;

export default function Sliding({ items = [] }) {
  Component.call(this, { html, events });

  this.slideIndex = 0;
  this.slides = this.selected.get('sliding-content').children;

  this.setSlide(this.slideIndex);
}

Sliding.prototype = Object.assign(Sliding.prototype, Component.prototype, {
  setSlide() {},
  next() {},
  prev() {},
});
