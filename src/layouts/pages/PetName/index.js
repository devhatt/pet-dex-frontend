import { Component } from 'pet-dex-utilities';
import TextInput from '../../../components/TextInput';
import UploadImage from '../../../components/UploadImage';
import Button from '../../../components/Button';
import './index.scss';

const events = ['submit'];

const html = `
  <div class='pet-name'>
    <div class='pet-name__container'>
      <div class='pet-name__image' data-select='upload-image-container'></div>
      <h1 class='pet-name__title'>Qual o nome do seu bichinho?</h1>
      <div class='pet-name__input' data-select='input-container'></div>
    </div>
    <div class="pet-name__footer">
      <div class='pet-name__button' data-select='button-container'></div>
    </div>
  </div>
`;

export default function PetName() {
  Component.call(this, { html, events });

  const $inputContainer = this.selected.get('input-container');
  const $uploadImage = this.selected.get('upload-image-container');
  const $buttonContainer = this.selected.get('button-container');

  this.input = new TextInput({
    placeholder: 'Nome do Pet',
  });

  this.upload = new UploadImage();
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  const updateButtonVisibility = () => {
    const input = this.input.getValue();
    const image = this.upload.getImage();

    this.button.setIsDisabled(!(input && image));
  };
  updateButtonVisibility();

  this.upload.listen('value:change', updateButtonVisibility);
  this.input.listen('value:change', updateButtonVisibility);

  this.button.listen('click', () => {
    const image = this.upload.getImage();
    const name = this.input.getValue();
    this.emit('submit', { image, name });
  });

  this.upload.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($buttonContainer);
}

PetName.prototype = Object.assign(PetName.prototype, Component.prototype);
