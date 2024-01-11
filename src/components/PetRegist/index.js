/* eslint-disable prettier/prettier */
import { Component } from 'pet-dex-utilities';
import './index.scss';
import Bars from './Bars.svg';

const html = `
  <section class="slider">
    <div class="slider__text-slider">
        <h3 data-select="weight" class="slider__weight">0</h3>
    </div>
    <div class="slider__container">
      <input type="range" value="50" step="0.1" min="0" max="100" data-select="rangeSlider" class="slider__input"/>
      <img class="slider__bars-svg" alt="rangeSlider" src="${Bars}" data-select="svg">
    </div>    
  </section>
`;

const events = ['weight'];

export default function Slider() {
  Component.call(this, { html, events });
  this.enable = true;

  this.selected.get('rangeSlider').addEventListener(
    'input',
    (event) => {
      if (!this.enable) return;

      this.weight();
      this.setValue(event.target.value);
    },
    false,
  );
}
Slider.prototype = Object.assign(Slider.prototype, Component.prototype, {
  setTitle() {
    this.selected.get('weight').textContent = Text;
  },
  setValue() {
    this.selected.get('weight').textContent = this.selected.get('rangeSlider').value;
  },
  weight() {
    this.emit('weight');
  },
  disable() {
    this.enable = false;
  },
});
