import { Component } from 'pet-dex-utilities';
import UploadImage from '../../../components/UploadImage';
import RangeSlider from '../../../components/RangeSlider';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './index.scss';

const html = `
  <div class="pet-weight-page">
    <div class="pet-weight-page__content" data-select="container">
      <div class="pet-weight-page__image" data-select="image-container"></div>

      <div class="pet-weight-page__description">
        <h1 class="pet-weight-page__title">Qual é o peso do seu animal de estimação?</h1>
        <p class="pet-weight-page__hint">Ajuste de acordo com a realidade</p>
      </div>

      <div class="pet-weight-page__slider-container" data-select="slider-container"></div>

      <div class="pet-weight-page__inputs">
        <div class="pet-weight-page__text-input" data-select="input-container"></div>
        <div>
          <input type="radio" id="kg" name="weight-unit" value="kg" checked>
          <label for="kg">Kg</label>
        </div>

        <div>
          <input type="radio" id="lb" name="weight-unit" value="lb">
          <label for="lb">Lb</label>
        </div>
      </div>    
    </div>
  </div>;
`;

export default function PetWeightPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');
  const $imageContainer = this.selected.get('image-container');
  const $sliderContainer = this.selected.get('slider-container');
  const $textInputContainer = this.selected.get('input-container');

  let $weight = null;

  this.image = new UploadImage();
  this.slider = new RangeSlider();
  this.input = new TextInput({
    placeholder: 'Peso',
    assetUrl: '',
    assetPosition: 'prefix',
    variation: 'standard',
  });
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: false,
    isDisabled: false,
  });

  this.image.selected
    .get('image-preview')
    .classList.add('pet-weight-page__img');

  this.slider.selected
    .get('range-slider')
    .classList.add('pet-weight-page__slider');
  this.input.selected.get('input-text').classList.add('pet-weight-page__input');
  this.button.selected.get('button').classList.add('pet-weight-page__button');

  this.slider.listen('value:change', (value) => {
    $weight = value.toFixed(1);
    this.input.selected.get('input-text').value = $weight;
  });

  this.input.listen('value:changed', (value) => {
    $weight = Number(value);
    this.slider.setValue($weight);
  });

  this.image.mount($imageContainer);
  this.slider.mount($sliderContainer);
  this.input.mount($textInputContainer);
  this.button.mount($container);
}

PetWeightPage.prototype = Object.assign(
  PetWeightPage.prototype,
  Component.prototype,
);
