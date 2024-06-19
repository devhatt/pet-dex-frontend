import { Component } from 'pet-dex-utilities';
import TextInput from '../TextInput/index';
import DropDown from '../Dropdown/index';
import Button from '../Button/index';
import googleIcon from './images/google-icon.png';
import facebookIcon from './images/facebook-icon.png';
import './index.scss';

const events = ['register'];

const html = `
    <div data-select="component-container" class="register-component-container">
        <h1 data-select="register-form-title" class="form-title">Crie sua petconta</h1>
        <div data-select="social-area" class="social-container">
            <div class="social-btn-layout">
                <button class="google-social-btn">
                    <img class="social-image" src=${googleIcon} >
                    Google
                </button>
                <button class="facebook-social-btn">
                    <img class="social-image" src=${facebookIcon} >
                    Facebook
                </button>
            </div>
            <div class="other-option-container">
                <hr class="divisor-line">
                <p class="divisor-text">Ou</p>
                <hr class="divisor-line">
            </div>
        </div>
        <form action="submit">
                <div class="register-form-layout">
                    <div class="form-fields-container">
                        <label class="form-label" for="first-name">Nome</label>
                        <div class="form-text-input" data-select="first-name-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="last-name">Sobrenome</label>
                        <div class="form-text-input" data-select="last-name-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="birthday">Data de nascimento</label>
                        <div class="form-text-input" data-select="birthday-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="local">Local</label>
                        <div class="form-dropdown-input" data-select="dropdown-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="email">E-mail</label>
                        <div class="form-text-input" data-select="email-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="phone">Celular</label>
                        <div class="form-text-input" data-select="phone-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="password">Senha</label>
                        <div class="form-text-input" data-select="password-input"></div>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-label" for="confirm-password">Confirmar senha</label>
                        <div class="form-text-input" data-select="confirm-password-input"></div>
                    </div>
                </div>
                <div class="register-button" data-select="form-button"></div>
        </form>
    </div>
`;

export default function RegisterForm() {
  Component.call(this, { html, events });

  const $firstNameInputContainer = this.selected.get('first-name-input');
  const $lastNameInputContainer = this.selected.get('last-name-input');
  const $birthdayInputContainer = this.selected.get('birthday-input');
  const $emailInputContainer = this.selected.get('email-input');
  const $phoneInputContainer = this.selected.get('phone-input');
  const $passwordInputContainer = this.selected.get('password-input');
  const $confirmPasswordInputContainer = this.selected.get(
    'confirm-password-input',
  );
  const $dropdownInputContainer = this.selected.get('dropdown-input');
  const $registerButtonContainer = this.selected.get('form-button');

  const firstNameInput = new TextInput({
    placeholder: 'Devhat',
    variation: 'standard',
  });

  const lastNameInput = new TextInput({
    placeholder: 'DevHat',
    variation: 'standard',
  });

  const birthdayInput = new TextInput({
    placeholder: '13/12/1995',
    variation: 'standard',
  });

  const dropdownInput = new DropDown({
    items: [],
    placeholder: 'São Paulo, SP',
  });

  const emailInput = new TextInput({
    placeholder: 'dev@devhat.com.br',
    variation: 'standard',
  });

  const phoneInput = new TextInput({
    placeholder: '(11) 92875-3356',
    variation: 'standard',
  });

  const passwordInput = new TextInput({
    placeholder: '******',
    variation: 'standard',
  });

  const confirmPasswordInput = new TextInput({
    placeholder: '******',
    variation: 'standard',
  });

  const registerButton = new Button({
    text: 'Cadastrar',
    isFullWidth: true,
    isDisabled: false,
  });

  firstNameInput.selected.get('input-text');
  firstNameInput.mount($firstNameInputContainer);

  lastNameInput.selected.get('input-text');
  lastNameInput.mount($lastNameInputContainer);

  birthdayInput.selected.get('input-text');
  birthdayInput.mount($birthdayInputContainer);

  dropdownInput.selected.get('dropdown-toggle').classList.add('dropdown-form');
  dropdownInput.mount($dropdownInputContainer);

  emailInput.selected.get('input-text');
  emailInput.mount($emailInputContainer);

  phoneInput.selected.get('input-text');
  phoneInput.mount($phoneInputContainer);

  passwordInput.selected.get('input-text');
  passwordInput.mount($passwordInputContainer);

  confirmPasswordInput.selected.get('input-text');
  confirmPasswordInput.mount($confirmPasswordInputContainer);

  registerButton.selected.get('button');
  registerButton.mount($registerButtonContainer);
}

RegisterForm.prototype = Object.assign(
  RegisterForm.prototype,
  Component.prototype,
  {},
);
