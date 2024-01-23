import { Component } from 'pet-dex-utilities';
import './index.scss';
import placeholderImage from './img/placeholder.svg';
import plus from './img/plus.svg';
import photoAdded from './img/photo-added.svg';

const html = `
  <div class="upload-image-container" data-select="upload-container">
    <div class="upload-image-container__animation" data-select="upload-animation">
      <div class="circle"></div>
      <div class="circle-duplicate"></div>
    </div>
    <label for="input-file" class="upload-image-container__label" data-select="upload-label">
      <div class="image-container" data-select="upload-image-container">
        <img class="profile-image" data-select="upload-icon" src="${placeholderImage}" alt="Imagem de upload">
        <img class="preview-image hidden" data-select="upload-preview">
      </div>
      <div class='button' data-select="upload-button">
        <img data-select="upload-button-img" src="${plus}">
      </div>
      <input id="input-file" name="input-file" type="file" accept="image/*" data-select="upload-input">
    </label>
  </div>
`;

export default function UploadImage() {
  Component.call(this, { html });

  const previewImage = this.selected.get('upload-preview');
  const buttonImg = this.selected.get('upload-button-img');

  this.selected.get('upload-input').addEventListener('change', (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (l) => {
        const readerTarget = l.target;
        previewImage.src = readerTarget.result;
        previewImage.classList.remove('hidden');
        buttonImg.src = photoAdded;
      });

      reader.readAsDataURL(file);
    }
  });
}

UploadImage.prototype = Object.assign(
  UploadImage.prototype,
  Component.prototype
);
