import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import UploadImage from '../../../components/UploadImage';
import './index.scss';

const html = `
  <div class="general-size" data-select="general-size">
    <div class="general-size__general-size-container">
      <div class="general-size__upload-image-container">
        <div class="general-size__upload-image" data-select="upload-image"></div>
      </div>
      <div class="general-size__texts">
        <div class="general-size__title">Qual é o tamanho do seu animal de estimação?</div>
        <div class="general-size__text">Ajuste de acordo com a realidade</div>
      </div>
      <div class="general-size__slider" data-select="slider"></div>
    </div>
    <div class="general-size__container-button">
      <div class="general-size__button" data-select="button"></div>
    </div>
  </div>
`;

export default function GeneralSize() {
  Component.call(this, { html });

  const $uploadImage = this.selected.get('upload-image');
  const $button = this.selected.get('button');
  let valor = null;

  this.uploadImage = new UploadImage();
  this.uploadImage.mount($uploadImage);

  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  this.button.mount($button);
}

GeneralSize.prototype = Object.assign(
  GeneralSize.prototype,
  Component.prototype,
);
