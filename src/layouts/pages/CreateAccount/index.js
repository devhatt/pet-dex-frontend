import { Component } from 'pet-dex-utilities';
import Button from '~src/components/Button';
import TextInput from '~src/components/TextInput';
import Field from '~src/components/RegisterForm/components/Field';
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
        <form class="breed-page__content_form">
          <div class="input-container" data-select="input-container">
            <div class="link-password" data-select="link-password">
              <a href="#">alterar senha</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div data-select="footer-container" class="breed-page__footer"></div>
  </div>
`;

export default function CreateAccount() {
  Component.call(this, { html, events });

  // const $container = this.selected.get('container');
  const $uploadImage = this.selected.get('image-container');
  const $field = this.selected.get('input-container');

  const $footerContainer = this.selected.get('footer-container');

  const $password = this.selected.get('link-password');

  this.activeCard = null;

  const name = new Field({
    label: 'Nome e Sobrenome',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: 'Informe seu nomes',
    }),
  });

  const phone = new Field({
    label: 'Celular',
    error: 'Devhat',
    content: new TextInput({
      id: 'name',
      placeholder: '(11) 12345-6789',
    }),
  });

  const dataNascimento = new Field({
    label: 'Data de nascimento',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: '13/12/1995',
    }),
  });

  const local = new Field({
    label: 'Local',
    error: 'Informe seu celualr',
    content: new TextInput({
      id: 'name',
      placeholder: 'Sao Paulo, SP',
    }),
  });

  const mail = new Field({
    label: 'E-mail',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: 'dev@devhat.com.br',
      type: 'mail',
    }),
  });
  const password = new Field({
    label: 'Senha',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: '*******',
      type: 'password',
    }),
  });

  const $button = new Button({
    text: 'Salvar',
    isFullWidth: false,
    isDisabled: true,
  });

  const $image = new UploadImage({});

  $button.listen('click', () => {
    this.emit('submit', { breedSelected: this.breedSelected });
  });

  $image.mount($uploadImage);

  name.mount($field);
  phone.mount($field);
  dataNascimento.mount($field);
  local.mount($field);
  mail.mount($field);
  password.mount($password);

  $button.selected.get('button').classList.add('breed-page__button');
  $button.mount($footerContainer);
}

CreateAccount.prototype = Object.assign(
  CreateAccount.prototype,
  Component.prototype,
);
