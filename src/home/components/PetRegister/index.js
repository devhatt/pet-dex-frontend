import { Component } from 'pet-dex-utilities';
import './index.scss';
import TextInput from '../../../components/TextInput';
import UploadImage from '../../../components/UploadImage';
import Button from '../../../components/Button';

const html = `
  <div class='pet-register__container' data-select="input">
    <div class='pet-register-description__container'>
      <div class='pet-register-image' data-select='upload-image'></div>
      <h1 class='pet-register-title__container'>Qual o nome do seu bichinho?</h1>
    </div>
  </div>
`;

export default function PetRegister() {
  Component.call(this, { html });

  const $inputContainer = this.selected.get('input');
  const $uploadImage = this.selected.get('upload-image');

  this.input = new TextInput({
    placeholder: 'Nome do Pet',
    variation: 'standard',
  });

  this.upload = new UploadImage();
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  this.input.selected.get('input-text').classList.add('pet-register-input');
  this.button.selected.get('button').classList.add('pet-register-button');
  this.upload.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($inputContainer);
}

PetRegister.prototype = Object.assign(
  PetRegister.prototype,
  Component.prototype,
);
