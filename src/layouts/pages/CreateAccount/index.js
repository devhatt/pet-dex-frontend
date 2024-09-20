import { Component } from 'pet-dex-utilities';
import Button from '~src/components/Button';
import UploadImage from '../../../components/UploadImage';

import './index.scss';

const events = ['select:card', 'submit'];

const html = `
  <div class="breed-page">
    <div data-select="container" class="breed-page__breed-grid">
      <div data-select="header-container" class="breed-page__header">
        <h1>Conta</h1>
        <p>Informações pessoais, email e senha</p>
      </div>
      <div data-select="content-container" class="breed-page__content">
        <div data-select="image-container" class="breed-page__image"></div>
        <form>
          <input type='text'/>
          <input type='text'/>
          <input type='text'/>
          <input type='text'/>
        </form>
      </div>
    </div>
    <div data-select="footer-container" class="breed-page__footer"></div>
  </div>
`;

export default function CreateAccount() {
  Component.call(this, { html, events });

  // const $container = this.selected.get('container');
  const $footerContainer = this.selected.get('footer-container');
  const $uploadImage = this.selected.get('image-container');
  this.activeCard = null;

  const $button = new Button({
    text: 'Salvar',
    isFullWidth: false,
    isDisabled: true,
  });

  const $image = new UploadImage();
  $image.mount($uploadImage);

  $button.listen('click', () => {
    this.emit('submit', { breedSelected: this.breedSelected });
  });

  $button.selected.get('button').classList.add('breed-page__button');
  $button.mount($footerContainer);
}

CreateAccount.prototype = Object.assign(
  CreateAccount.prototype,
  Component.prototype,
);
