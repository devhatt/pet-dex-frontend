import { Component } from 'pet-dex-utilities';
import './index.scss';
import TextInput from '../../../components/TextInput';
import UploadImage from '../../../components/UploadImage';
import Button from '../../../components/Button';

const html = `
  <div class='pet-register'>
      <div class='pet-register__container'>
        <div class='pet-register__image' data-select='upload-image-container'></div>
        <h1 class='pet-register__title'>Qual o nome do seu bichinho?</h1>
        <div class='pet-register__input' data-select='input-container'></div>
      </div>
      <div class='pet-register__button' data-select='button-container'></div>
  </div>
`;

export default function PetRegister() {
  Component.call(this, { html });

  const $inputContainer = this.selected.get('input-container');
  const $uploadImage = this.selected.get('upload-image-container');
  const $buttonContainer = this.selected.get('button-container');

  this.input = new TextInput({
    placeholder: 'Nome do Pet',
    variation: '--inputStyle',
  });

  this.upload = new UploadImage();
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });
  // this.button.listen("click", () => this.emit("submit", ))

  this.input.selected
    .get('input-text')
    .classList.add('pet-register--inputStyle');
  this.button.selected.get('button').classList.add('pet-register-button');
  this.upload.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($buttonContainer);
}

PetRegister.prototype = Object.assign(
  PetRegister.prototype,
  Component.prototype,
);
