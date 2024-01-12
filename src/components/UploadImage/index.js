import { Component } from 'pet-dex-utilities';
import './index.scss';
import placeholderImage from './img/placeholder.svg';
import plus from './img/plus.svg';

const html = `
  <div class="upload-image-container">
  <div class="upload-image-container__animation" data-select="upload-animation">
      <div class="circle"></div>
      <div class="circle-duplicate"></div>
    </div>
    <label for="file-upload" class="upload-image-container__label" data-select="upload-label">
      <div class="image">
        <img src="${placeholderImage}" alt="Imagem de upload">
      </div>
      <div class='button'>
        <img src="${plus}">
      </div>
      <input id="file-upload" type="file" accept="image/*">
    </label>
    
  </div>
`;

export default function UploadImage() {
  Component.call(this, { html });
}

UploadImage.prototype = Object.assign(
  UploadImage.prototype,
  Component.prototype,
  {},
);
