import { Component } from 'pet-dex-utilities';
import './index.scss';
import placeholderImage from './img/placeholder.svg';
import plusIcon from './img/plus-icon.svg';
import photoIcon from './img/photo-icon.svg';

const html = `
  <div class="upload-container">
    <div class="upload-container__animation" data-select="upload-animation">
      <div class="circle"></div>
      <div class="circle-duplicate"></div>
    </div>
    <label for="input-file" class="upload-container__label">
      <div class="image-container">
        <img class="placeholder-image" src="${placeholderImage}" alt="Placeholder">
        <img class="preview-image hidden" data-select="upload-preview" alt="Imagem carregada">
      </div>
      <div class='button'>
        <img data-select="button-icon" src="${plusIcon}">
      </div>
      <input id="input-file" name="input-file" type="file" accept="image/*" data-select="upload-input">
    </label>
  </div>
`;

export default function UploadImage() {
  Component.call(this, { html });

  const previewImage = this.selected.get('upload-preview');
  const buttonIcon = this.selected.get('button-icon');

  this.selected.get('upload-input').addEventListener('change', (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const readerTarget = e.target;
        previewImage.src = readerTarget.result;
        previewImage.classList.remove('hidden');
        buttonIcon.src = photoIcon;
      });

      reader.readAsDataURL(file);
    }
  });
}

UploadImage.prototype = Object.assign(
  UploadImage.prototype,
  Component.prototype,
);
