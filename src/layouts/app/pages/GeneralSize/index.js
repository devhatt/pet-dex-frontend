import { Component } from 'pet-dex-utilities';
import UploadImage from '../../../../components/UploadImage';
import './index.scss';
import SizeSelector from '../../../../components/SizeSelector';
import Button from '../../../../components/Button';

const events = ['submit'];

const html = `
  <div class="general-size-page">
    <div class="general-size-page__content" data-select="container">
      <div class="general-size-page__image-container" data-select="image-container"></div>

      <div class="general-size-page__description">
        <h1 class="general-size-page__title">Qual é o tamanho do seu animal de estimação?</h1>
        <p class="general-size-page__hint">Ajuste de acordo com a realidade</p>
      </div>

      <div class="general-size-page__size-selector" data-select="size-selector"></div>  
      <div class="general-size-page__button-container" data-select="button-container">
        <div class="general-size-page__button" data-select="button"></div>
      </div>

    </div>
  </div>;
`;

export default function GeneralSize() {
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

  this.renderUploadImage();
  this.renderSizeSelector();
  this.renderButton();
  this.setActions();
}

GeneralSize.prototype = Object.assign(
  GeneralSize.prototype,
  Component.prototype,
  {
    renderUploadImage() {
      this.uploadImage.mount(this.imageContainer);
    },
    renderSizeSelector() {
      this.sizeselector.mount(this.sizeselectorContainer);
    },
    renderButton() {
      this.button.mount(this.buttonComponent);
    },
    setActions() {
      this.button.listen('click', () => {
        let size = this.sizeselector.activeCardInit().card;
        let sizeIndex = this.sizeselector.activeCardInit().index;

        this.sizeselector.listen('size:change', (card, index) => {
          size = card;
          sizeIndex = index;
        });
        this.emit('submit', { size, sizeIndex });
      });
    },
  },
);
