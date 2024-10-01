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

  const $uploadImage = this.selected.get('image-container');
  const $field = this.selected.get('input-container');
  const $footerContainer = this.selected.get('footer-container');
  const $password = this.selected.get('link-password');

  this.activeForm = null;

  const name = new Field({
    label: 'Nome e Sobrenome',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: 'Informe seu nome completo',
      type: 'text',
    }),
  });

  const phone = new Field({
    label: 'Celular',
    error: 'Devhat',
    content: new TextInput({
      id: 'phone',
      placeholder: '(11) 12345-6789',
      type: 'number',
    }),
  });

  const dataNascimento = new Field({
    label: 'Data de nascimento',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'nasc',
      placeholder: '13/12/1995',
      type: 'date',
    }),
  });

  const local = new Field({
    label: 'Local',
    error: 'Informe seu celular',
    content: new TextInput({
      id: 'local',
      placeholder: 'Sao Paulo, SP',
      type: 'text',
    }),
  });

  const mail = new Field({
    label: 'E-mail',
    error: 'Informe seu e-mail',
    content: new TextInput({
      id: 'mail',
      placeholder: 'dev@devhat.com.br',
      type: 'mail',
    }),
  });

  const password = new Field({
    label: 'Senha',
    error: 'Informe sua senha',
    content: new TextInput({
      id: 'password',
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

  name.content.listen('value:change', () => {
    if (this.activeForm) this.activeCard.deactivate();

    this.emit('select:card', name);
    $button.enable();
  });

  $button.listen('click', () => {
    // console.log('submitado', { name, phone, dataNascimento, local, mail, password })

    this.emit('submit', { name, phone, dataNascimento, local, mail, password });
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

// o submit do botao vai ser nesse estilo

// const form = {
//   isNeutered: undefined,
//   isSpecialCare: undefined,
//   specialCareText: '',
//   vaccines: undefined,
// };

// const emitForm = () => {
//   const neuteredValue = document.forms[0].elements.neutered.value;
//   const specialCareValue = document.forms[1].elements.specialCare.value;
//   const specialCareText = this.specialCareText.selected.get('textarea').value;

//   if (!neuteredValue || !specialCareValue) return;
//   if (getBooleanValue(specialCareValue) && !specialCareText) return;

//   form.isNeutered = getBooleanValue(neuteredValue);
//   form.isSpecialCare = getBooleanValue(specialCareValue);
//   form.specialCareText = specialCareText;

//   form.vaccines = this.vaccine.listVaccines();
//   this.emit('submit', form);
// };

// this.button.listen('click', emitForm);
