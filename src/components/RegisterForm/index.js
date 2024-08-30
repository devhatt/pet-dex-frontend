import { Component } from 'pet-dex-utilities';
import Field from './components/Field/index';
import TextInput from '../TextInput';
import Dropdown from '../Dropdown';
import Button from '../Button/index';
import {
  isNameValid,
  isBirthValid,
  isLocalValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
} from '../../utils/validations';
import googleIcon from './images/google-icon.svg';
import facebookIcon from './images/facebook-icon.svg';
import './index.scss';
import { UserService } from '../../services/userService';

const events = ['register'];

const html = `
    <div class="register-form">
      <h1 class="register-form__title">Crie sua petconta</h1>
      <div class="register-form__socials">
        <button class="register-form__social">
          <img class="register-form__social-img" src=${googleIcon} />
          Google
        </button>
        <button class="register-form__social">
          <img class="register-form__social-img" src=${facebookIcon} />
          Facebook
        </button>
      </div>
      <div class="register-form__divisor">
        <hr class="register-form__divisor-line">
        <span class="register-form__divisor-text">Ou</span>
        <hr class="register-form__divisor-line">
      </div>
      <form action="submit" data-select="form" class="register-form__form">
        <div class="register-form__form-fields" data-select="fields"></div>
        <div class="register-form__form-button" data-select="form-button"></div>
      </form>
    </div>
`;

export default function RegisterForm() {
  Component.call(this, { html, events });

  const $formButton = this.selected.get('form-button');
  const $fields = this.selected.get('fields');

  const name = new Field({
    label: 'Nome',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: 'Devhat',
    }),
  });

  const surname = new Field({
    label: 'Sobrenome',
    error: 'Informe seu sobrenome',
    content: new TextInput({
      id: 'surname',
      placeholder: 'Devhat',
    }),
  });

  const birth = new Field({
    label: 'Data de nascimento',
    error: 'Informe sua data de nascimento',
    content: new TextInput({
      id: 'birth',
      placeholder: '13/12/1995',
    }),
  });

  const local = new Field({
    label: 'Cidade',
    error: 'Informe sua cidade',
    content: new Dropdown({
      items: [
        {
          text: 'Fortaleza',
          value: 'FOR',
        },
        {
          text: 'São Paulo',
          value: 'SP',
        },
      ],
      id: 'local',
      placeholder: 'São Paulo, SP',
    }),
  });

  const email = new Field({
    label: 'E-mail',
    error: 'Informe um E-mail válido',
    content: new TextInput({
      id: 'email',
      placeholder: 'dev@devhat.com.br',
      type: 'email',
    }),
  });

  const phone = new Field({
    label: 'Telefone',
    error: 'Informe um número de telefone válido',
    content: new TextInput({
      id: 'phone',
      placeholder: '(11) 92875-3356',
    }),
  });

  const password = new Field({
    label: 'Senha',
    error:
      'Senha inválida. Sua senha deve conter no mínimo 10 caracteres, incluindo pelo menos um caractere especial e uma letra maiúscula.',
    content: new TextInput({
      id: 'password',
      placeholder: '*********',
      type: 'password',
    }),
  });

  const repeatPassword = new Field({
    label: 'Confirmar senha',
    error: 'Senha inválida.',
    content: new TextInput({
      id: 'repeat-password',
      placeholder: '*********',
      type: 'password',
    }),
  });

  const registerButton = new Button({
    id: 'register-button',
    text: 'Cadastrar',
    isFullWidth: true,
    isDisabled: false,
  });

  name.mount($fields);
  surname.mount($fields);
  birth.mount($fields);
  local.mount($fields);
  email.mount($fields);
  phone.mount($fields);
  password.mount($fields);
  repeatPassword.mount($fields);
  registerButton.mount($formButton);

  registerButton.listen('click', async () => {
    const nameValue = name.getContent().getValue();
    const surnameValue = surname.getContent().getValue();
    const birthValue = birth.getContent().getValue();
    const localValue = local.getContent().getValue();
    const emailValue = email.getContent().getValue();
    const phoneValue = phone.getContent().getValue();
    const passwordValue = password.getContent().getValue();
    const repeatPasswordValue = repeatPassword.getContent().getValue();

    let nameValid = true;
    let surnameValid = true;
    let birthValid = true;
    let localValid = true;
    let emailValid = true;
    let phoneValid = true;
    let passwordValid = true;
    let repeatPasswordValid = true;

    if (!isNameValid(nameValue)) {
      nameValid = false;

      name.showError();
      name.getContent().inputError();
    }

    if (!isNameValid(surnameValue)) {
      surnameValid = false;

      surname.showError();
      surname.getContent().inputError();
    }

    if (!isBirthValid(birthValue)) {
      birthValid = false;

      birth.showError();
      birth.getContent().inputError();
    }

    if (!isLocalValid(localValue)) {
      localValid = false;

      local.showError();
    }

    if (!isEmailValid(emailValue)) {
      emailValid = false;

      email.showError();
      email.getContent().inputError();
    }

    if (!isPhoneValid(phoneValue)) {
      phoneValid = false;

      phone.showError();
      phone.getContent().inputError();
    }

    if (!isPasswordValid(passwordValue)) {
      passwordValid = false;

      password.showError();
      password.getContent().inputError();
    }

    if (
      !isPasswordValid(repeatPasswordValue) ||
      repeatPasswordValue !== passwordValue
    ) {
      repeatPasswordValid = false;

      repeatPassword.showError();
      repeatPassword.getContent().inputError();
    }

    if (nameValid) {
      name.resolveError();
    }

    if (surnameValid) {
      surname.resolveError();
    }

    if (birthValid) {
      birth.resolveError();
    }

    if (localValid) {
      local.resolveError();
    }

    if (emailValid) {
      email.resolveError();
    }

    if (phoneValid) {
      phone.resolveError();
    }

    if (passwordValid) {
      password.resolveError();
    }

    if (repeatPasswordValid) {
      repeatPassword.resolveError();
    }

    if (
      nameValid &&
      surnameValid &&
      birthValid &&
      localValid &&
      emailValid &&
      phoneValid &&
      passwordValid &&
      repeatPasswordValid
    ) {
      await UserService.registerUser({
        name: nameValue,
        surname: surnameValue,
        birth: birthValue,
        local: localValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue,
      });

      this.register();
    }
  });
}

RegisterForm.prototype = Object.assign(
  RegisterForm.prototype,
  Component.prototype,
  {
    register() {
      this.emit('register');
    },
  },
);
