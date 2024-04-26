import { Component } from 'pet-dex-utilities';
import UploadImage from '../../../components/UploadImage';
import RangeSlider from '../../../components/RangeSlider';
import TextInput from '../../../components/TextInput';
import RadioButton from '../../../components/RadioButton';
import Button from '../../../components/Button';
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

export default function PetWeightPage({ petPhoto }) {
  Component.call(this, { html });
  this.initializeComponents();
  this.setupEventListeners();
  this.styleComponents();
  this.petPhoto = petPhoto;
}

PetWeightPage.prototype = Object.assign(
  PetWeightPage.prototype,
  Component.prototype,
  {
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

      // Mount components
      this.image.mount($imageContainer);
      this.slider.mount($sliderContainer);
      this.input.mount($inputsContainer);
      this.radioKG.mount($inputsContainer);
      this.radioLB.mount($inputsContainer);
      this.button.mount($container);
    },

    styleComponents() {
      // Add classes to components
      this.addClassToComponent(
        this.image.selected.get('image-preview'),
        'pet-weight-page__image',
      );
      this.addClassToComponent(
        this.slider.selected.get('range-slider'),
        'pet-weight-page__slider',
      );
      this.addClassToComponent(
        this.slider.selected.get('range-slider-value'),
        'pet-weight-page__value',
      );
      this.addClassToComponent(
        this.input.selected.get('input-text'),
        'pet-weight-page__input',
      );
      this.addClassToComponent(
        this.input.selected.get('input-text-container'),
        'pet-weight-page__input-container',
      );
      this.addClassToComponent(
        this.radioKG.selected.get('radio-container'),
        'pet-weight-page__radio',
      );
      this.addClassToComponent(
        this.radioLB.selected.get('radio-container'),
        'pet-weight-page__radio',
      );
      this.addClassToComponent(
        this.button.selected.get('button'),
        'pet-weight-page__button',
      );
    },

    addClassToComponent(element, className) {
      element.classList.add(className);
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

      function weightUnit() {
        return this.radioKG.isChecked()
          ? this.radioKG.getValue()
          : this.radioLB.getValue();
      }

      this.button.listen('click', () => {
        const finalWeightUnit = weightUnit();
        const finalWeight = this.weight;
        this.emit('weight', finalWeight, finalWeightUnit);
      });
    },
  },
);
