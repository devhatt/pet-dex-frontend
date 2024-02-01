import { Component } from 'pet-dex-utilities';
import './index.scss';
import placeholderImage from './img/placeholder.svg';
import plusIcon from './img/plus-icon.svg';
import photoIcon from './img/photo-icon.svg';

const html = `
  <div class="container">
    <div class="container__animation">
      <div class="container__circle"></div>
      <div class="container__circle-duplicate"></div>
    </div>
    <label for="input-file" class="container__label">
      <div class="container__image-container">
        <img class="container__placeholder-image" src="${placeholderImage}" alt="Placeholder">
        <img class="container__preview-image hidden" data-select="image-preview" alt="Imagem carregada">
      </div>
      <div class='container__button'>
        <img data-select="button-icon" src="${plusIcon}">
      </div>
      <input class="container__input" id="input-file" name="input-file" type="file" accept="image/*" data-select="upload-input">
    </label>
  </div>
`;

export default function UploadImage() {
  Component.call(this, { html });

  const previewImage = this.selected.get('image-preview');
  const buttonIcon = this.selected.get('button-icon');
  const uploadInput = this.selected.get('upload-input');

  const readAndDisplayImage = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const readerTarget = e.target;
      previewImage.src = readerTarget.result;
      previewImage.classList.remove('hidden');
      buttonIcon.src = photoIcon;
    });

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      readAndDisplayImage(file);
    }
  };

  uploadInput.addEventListener('change', handleInputChange);
}

UploadImage.prototype = Object.assign(
  UploadImage.prototype,
  Component.prototype,
);
