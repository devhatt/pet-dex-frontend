import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['click', 'text:change'];

const html = `
    <div class="slider--wrapper" data-select="slider-wrapper">
    </div>
`;

export default function Slider({ contents } = {}) {
  Component.call(this, { html, events });

  this.populateSlider(contents);
}

Slider.prototype = Object.assign(Slider.prototype, Component.prototype, {
  populateSlider(contents) {
    const $sliderWrapper = this.selected.get('slider-wrapper');

    contents.forEach((content) => {
      const $sliderItem = document.createElement('div');
      $sliderItem.className = 'slider--wrapper__content';
      $sliderWrapper.appendChild($sliderItem);
      content.mount($sliderItem);
    });
  },
});
