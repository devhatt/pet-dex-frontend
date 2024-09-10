import { Component } from 'pet-dex-utilities';
import Button from '~src/components/Button';
import UploadImage from '~src/components/UploadImage';
import SizeSelector from '~src/components/SizeSelector';
import './index.scss';

const events = ['submit'];

const html = `
  <div class="pet-size-page">
    <div class="pet-size-page__content" data-select="container">
      <div class="pet-size-page__image-container" data-select="image-container"></div>

      <div class="pet-size-page__description">
        <h1 class="pet-size-page__title">Qual é o tamanho do seu animal de estimação?</h1>
        <label class="pet-size-page__hint">Ajuste de acordo com a realidade</label>
      </div>

      <div class="pet-size-page__size-selector" data-select="size-selector"></div>  

    </div>
    <div class="pet-size-page__button-container" data-select="button-container">
        <div class="pet-size-page__button" data-select="button"></div>
      </div>
  </div>;
`;

export default function PetSize() {
  Component.call(this, { html, events });
  this.container = this.selected.get('container');

  this.imageContainer = this.selected.get('image-container');
  this.sizeselectorContainer = this.selected.get('size-selector');
  this.buttonComponent = this.selected.get('button');
  this.uploadImage = new UploadImage();
  this.sizeselector = new SizeSelector();
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  this.renderComponents();
  this.getSize();
  this.button.listen('click', () => {
    this.emit('submit', {
      sizeTitle: this.sizeTitle,
      weightRange: this.weightRange,
      sizeIndex: this.sizeIndex,
    });
  });
}

PetSize.prototype = Object.assign(PetSize.prototype, Component.prototype, {
  renderComponents() {
    this.uploadImage.mount(this.imageContainer);
    this.sizeselector.mount(this.sizeselectorContainer);
    this.button.mount(this.buttonComponent);
  },
  getSize() {
    this.sizeTitle = this.sizeselector
      .activeCardInit()
      .card.querySelector('.container-size-selector__title').textContent;
    this.weightRange = this.sizeselector
      .activeCardInit()
      .card.querySelector('.container-size-selector__text').textContent;
    this.sizeIndex = this.sizeselector.activeCardInit().index;

    this.sizeselector.listen('size:change', (card, index) => {
      this.sizeTitle = card.querySelector(
        '.container-size-selector__title',
      ).textContent;
      this.weightRange = card.querySelector(
        '.container-size-selector__text',
      ).textContent;
      this.sizeIndex = index;
    });
  },
});
