import { Component } from 'pet-dex-utilities';
import Button from '../../../../components/Button';
import RadioButton from '../../../../components/RadioButton';
import RangeSlider from '../../../../components/RangeSlider';
import TextInput from '../../../../components/TextInput';
import UploadImage from '../../../../components/UploadImage';
import './index.scss';

const html = `
  <div class="pet-weight-page">
    <div class="pet-weight-page__content" data-select="container">
      <div class="pet-weight-page__image-container" data-select="image-container"></div>

      <div class="pet-weight-page__description">
        <h1 class="pet-weight-page__title">Qual é o peso do seu animal de estimação?</h1>
        <p class="pet-weight-page__hint">Ajuste de acordo com a realidade</p>
      </div>

      <div class="pet-weight-page__slider-container" data-select="slider-container"></div>

      <div class="pet-weight-page__inputs" data-select="input-container">
      </div>    
    </div>
  </div>;
`;

export default function PetWeight({ petPhoto }) {
  Component.call(this, { html });
  this.initializeComponents();
  this.setupEventListeners();
  this.applyCssClasses();
  this.petPhoto = petPhoto;
}

PetWeight.prototype = Object.assign(PetWeight.prototype, Component.prototype, {
  initializeComponents() {
    const $container = this.selected.get('container');
    const $imageContainer = this.selected.get('image-container');
    const $sliderContainer = this.selected.get('slider-container');
    const $inputsContainer = this.selected.get('input-container');

    this.setupComponents(
      $container,
      $imageContainer,
      $sliderContainer,
      $inputsContainer,
    );
  },

  setupComponents(
    $container,
    $imageContainer,
    $sliderContainer,
    $inputsContainer,
  ) {
    this.image = new UploadImage();
    this.slider = new RangeSlider();
    this.input = new TextInput({
      placeholder: 'Peso',
      assetUrl: '',
      assetPosition: 'prefix',
      variation: 'standard',
    });
    this.radioKG = new RadioButton({
      check: true,
      text: 'KG',
      value: 'kg',
      name: 'weight-unit',
    });
    this.radioLB = new RadioButton({
      text: 'LB',
      value: 'lb',
      name: 'weight-unit',
    });
    this.button = new Button({
      text: 'Continuar',
      isFullWidth: false,
      isDisabled: false,
    });

    this.image.mount($imageContainer);
    this.slider.mount($sliderContainer);
    this.input.mount($inputsContainer);
    this.radioKG.mount($inputsContainer);
    this.radioLB.mount($inputsContainer);
    this.button.mount($container);
  },

  applyCssClasses() {
    this.image.selected
      .get('image-preview')
      .classList.add('pet-weight-page__image');
    this.slider.selected
      .get('range-slider')
      .classList.add('pet-weight-page__slider');
    this.slider.selected
      .get('range-slider-value')
      .classList.add('pet-weight-page__value');
    this.input.selected
      .get('input-text')
      .classList.add('pet-weight-page__input');
    this.input.selected
      .get('input-text-container')
      .classList.add('pet-weight-page__input-container');
    this.radioKG.selected
      .get('radio-container')
      .classList.add('pet-weight-page__radio');
    this.radioLB.selected
      .get('radio-container')
      .classList.add('pet-weight-page__radio');
    this.button.selected.get('button').classList.add('pet-weight-page__button');
  },

  setupEventListeners() {
    this.slider.listen('value:change', (value) => {
      this.weight = Number(value.toFixed(1));
      this.input.setValue(this.weight);
    });

    this.input.listen('value:change', (value) => {
      const numericValue = parseFloat(value);
      if (!numericValue.isNaN && this.weight !== numericValue) {
        this.weight = numericValue;
        this.slider.setValue(this.weight);
      }
    });

    this.button.listen('click', () => {
      const finalWeightUnit = this.weightUnit();
      const finalWeight = this.weight;
      this.emit('weight', finalWeight, finalWeightUnit);
    });
  },

  weightUnit() {
    return this.radioKG.isChecked()
      ? this.radioKG.getValue()
      : this.radioLB.getValue();
  },
});
