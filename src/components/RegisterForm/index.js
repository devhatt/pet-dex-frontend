import { Component } from 'pet-dex-utilities';
import TextInput from '../TextInput/index';
import DropDown from '../Dropdown/index';
import Button from '../Button/index';
import googleIcon from './images/google-icon.png';
import facebookIcon from './images/facebook-icon.png';
import './index.scss';

const events = ['register'];

const html = `
    <div class="register-form-container">
        <h1 class="register-form-container__title">Crie sua petconta</h1>
        <div class="social-container">
            <div class="social-container__btn-layout">
                <button class="social-container__btn-layout--google-btn">
                    <img class="social-image" src=${googleIcon} >
                    Google
                </button>
                <button class="social-container__btn-layout--facebook-btn">
                    <img class="social-image" src=${facebookIcon} >
                    Facebook
                </button>
            </div>
            <div class="social-container__separator">
                <hr class="divisor-line">
                <p class="divisor-text">Ou</p>
                <hr class="divisor-line">
            </div>
        </div>
        <form action="submit" data-select="register-form">
                <div class="register-form-layout">
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="first-name">Nome</label>
                        <div class="form-fields-container--text-input" data-select="first-name-input"></div>
                        <span class="error-message" data-select="name-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="surname">Sobrenome</label>
                        <div class="form-fields-container--text-input" data-select="surname-input"></div>
                        <span class="error-message" data-select="surname-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="birthday">Data de nascimento</label>
                        <div class="form-fields-container--text-input" data-select="birthday-input"></div>
                        <span class="error-message" data-select="birthday-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="local">Local</label>
                        <div class="form-fields-container--dropdown-input" data-select="dropdown-input"></div>
                        <span class="error-message" data-select="dropdown-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="email">E-mail</label>
                        <div class="form-fields-container--text-input" data-select="email-input"></div>
                        <span class="error-message" data-select="email-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="phone">Celular</label>
                        <div class="form-fields-container--text-input" data-select="phone-input"></div>
                        <span class="error-message" data-select="phone-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="password">Senha</label>
                        <div class="form-fields-container--text-input" data-select="password-input"></div>
                        <span class="error-message" data-select="password-error-message"></span>
                    </div>
                    <div class="form-fields-container">
                        <label class="form-fields-container--form-label" for="confirm-password">Confirmar senha</label>
                        <div class="form-fields-container--text-input" data-select="confirm-password-input"></div>
                        <span class="error-message" data-select="confirm-password-error-message"></span>
                    </div>
                </div>
                <div class="register-button" data-select="form-button"></div>
        </form>
    </div>
`;

export default function RegisterForm() {
  Component.call(this, { html, events });

  const $firstNameInputContainer = this.selected.get('first-name-input');
  const $firstNameErrorMessage = this.selected.get('name-error-message');

  const $surnameInputContainer = this.selected.get('surname-input');
  const $surnameErrorMessage = this.selected.get('surname-error-message');

  const $birthdayInputContainer = this.selected.get('birthday-input');
  const $birthdayErrorMessage = this.selected.get('birthday-error-message');

  const $emailInputContainer = this.selected.get('email-input');
  const $emailErrorMessage = this.selected.get('email-error-message');

  const $phoneInputContainer = this.selected.get('phone-input');
  const $phoneErrorMessage = this.selected.get('phone-error-message');

  const $passwordInputContainer = this.selected.get('password-input');
  const $passwordErrorMessage = this.selected.get('password-error-message');

  const $confirmPasswordInputContainer = this.selected.get(
    'confirm-password-input',
  );
  const $confirmPasswordErrorMessage = this.selected.get(
    'confirm-password-error-message',
  );

  const $dropdownInputContainer = this.selected.get('dropdown-input');
  const $dropdownErrorMessage = this.selected.get('dropdown-error-message');

  const $registerButtonContainer = this.selected.get('form-button');

  const firstNameInput = new TextInput({
    placeholder: 'Devhat',
    type: 'text',
  });

  const surnameInput = new TextInput({
    placeholder: 'DevHat',
    type: 'text',
  });

  const birthdayInput = new TextInput({
    placeholder: '13/12/1995',
    type: 'text',
  });

  const dropdownInput = new DropDown({
    items: [
      {
        text: 'São Paulo',
        value: 'SP',
      },
      {
        text: 'Fortaleza',
        value: 'FOR',
      },
      {
        text: 'Rio de Janeiro',
        value: 'RJ',
      },
      {
        text: 'Bahia',
        value: 'BA',
      },
      {
        text: 'Pernambuco',
        value: 'PE',
      },
    ],
    placeholder: 'Cidade',
  });

  const emailInput = new TextInput({
    placeholder: 'dev@devhat.com.br',
    type: 'email',
  });

  const phoneInput = new TextInput({
    placeholder: '(11) 92875-3356',
    type: 'text',
  });

  const passwordInput = new TextInput({
    placeholder: '*********',
    type: 'password',
  });

  const confirmPasswordInput = new TextInput({
    placeholder: '*********',
    type: 'password',
  });

  const registerButton = new Button({
    text: 'Cadastrar',
    isFullWidth: true,
  });

  firstNameInput.selected.get('input-text');
  firstNameInput.selected.get('input-text').id = 'first-name';
  firstNameInput.mount($firstNameInputContainer);

  surnameInput.selected.get('input-text');
  surnameInput.selected.get('input-text').id = 'surname';
  surnameInput.mount($surnameInputContainer);

  birthdayInput.selected.get('input-text');
  birthdayInput.selected.get('input-text').id = 'birthday';
  birthdayInput.mount($birthdayInputContainer);

  dropdownInput.selected.get('dropdown-toggle').classList.add('dropdown-form');
  dropdownInput.selected.get('dropdown-toggle').id = 'local';
  dropdownInput.mount($dropdownInputContainer);

  emailInput.selected.get('input-text');
  emailInput.selected.get('input-text').id = 'email';
  emailInput.mount($emailInputContainer);

  phoneInput.selected.get('input-text');
  phoneInput.selected.get('input-text').id = 'phone';
  phoneInput.mount($phoneInputContainer);

  passwordInput.selected.get('input-text');
  passwordInput.selected.get('input-text').id = 'password';
  passwordInput.mount($passwordInputContainer);

  confirmPasswordInput.selected.get('input-text');
  confirmPasswordInput.selected.get('input-text').id = 'confirm-password';
  confirmPasswordInput.mount($confirmPasswordInputContainer);

  registerButton.selected.get('button');
  registerButton.mount($registerButtonContainer);

  registerButton.listen('click', () => {
    // USAR MÉTODO GET VALUE DO TEXTINPUT E DO DROPDOWN
    const firstNameValue = firstNameInput.selected.get('input-text').value;
    const surnameValue = surnameInput.selected.get('input-text').value;
    const birthdayValue = birthdayInput.selected.get('input-text').value;
    const dropdownValue =
      dropdownInput.selected.get('dropdown-selected').dataset;
    const emailValue = emailInput.selected.get('input-text').value;
    const phoneValue = phoneInput.selected.get('input-text').value;
    const passwordValue = passwordInput.selected.get('input-text').value;
    const confirmPasswordValue =
      confirmPasswordInput.selected.get('input-text').value;

    let nameValid = true;
    let surnameValid = true;
    let birthdayValid = true;
    let dropdownValid = true;
    let emailValid = true;
    let phoneValid = true;
    let passwordValid = true;
    let confirmPasswordValid = true;

    if (!this.isNameValid(firstNameValue)) {
      nameValid = false;
      $firstNameErrorMessage.classList.add('show-error');
      $firstNameErrorMessage.innerText = 'Informe seu nome';
      firstNameInput.inputError();
    }

    if (!this.isNameValid(surnameValue)) {
      surnameValid = false;
      $surnameErrorMessage.classList.add('show-error');
      $surnameErrorMessage.innerText = 'Informe seu sobrenome';
      surnameInput.inputError();
    }

    if (!this.isBirthdayValid(birthdayValue)) {
      birthdayValid = false;
      $birthdayErrorMessage.classList.add('show-error');
      $birthdayErrorMessage.innerText = 'Informe sua data de nascimento';
      birthdayInput.inputError();
    }

    if (!dropdownValue.value) {
      dropdownValid = false;
      $dropdownErrorMessage.classList.add('show-error');
      dropdownInput.selected
        .get('dropdown-toggle')
        .classList.toggle('dropdown-form__show-error-dropdown');
      $dropdownErrorMessage.innerText = 'Selecione sua cidade';
    }

    if (!this.isEmailValid(emailValue)) {
      emailValid = false;
      $emailErrorMessage.classList.add('show-error');
      $emailErrorMessage.innerText = 'Informe um e-mail válido';
      emailInput.inputError();
    }

    if (!this.isPhoneValid(phoneValue)) {
      phoneValid = false;
      $phoneErrorMessage.classList.add('show-error');
      $phoneErrorMessage.innerText = 'Informe um número de telefone válido';
      phoneInput.inputError();
    }

    if (!this.isPasswordValid(passwordValue)) {
      passwordValid = false;
      $passwordErrorMessage.classList.add('show-error');
      $passwordErrorMessage.innerText =
        'Senha inválida. Sua senha deve conter no mínimo 10 caracteres, incluindo pelo menos um caractere especial e uma letra maiúscula.';
      passwordInput.inputError();
    }

    if (
      !this.isPasswordValid(confirmPasswordValue) ||
      passwordValue !== confirmPasswordValue
    ) {
      confirmPasswordValid = false;
      $confirmPasswordErrorMessage.classList.add('show-error');
      $confirmPasswordErrorMessage.innerText = 'Senhas diferentes';
      confirmPasswordInput.inputError();
    }

    if (nameValid) $firstNameErrorMessage.classList.remove('show-error');
    if (surnameValid) $surnameErrorMessage.classList.remove('show-error');
    if (birthdayValid) $birthdayErrorMessage.classList.remove('show-error');
    if (dropdownValid) $dropdownErrorMessage.classList.remove('show-error');
    if (dropdownValid)
      dropdownInput.selected
        .get('dropdown-toggle')
        .classList.remove('dropdown-form__show-error-dropdown');
    if (emailValid) $emailErrorMessage.classList.remove('show-error');
    if (phoneValid) $phoneErrorMessage.classList.remove('show-error');
    if (passwordValid) $passwordErrorMessage.classList.remove('show-error');
    if (confirmPasswordValid)
      $confirmPasswordErrorMessage.classList.remove('show-error');

    if (
      nameValid &&
      surnameValid &&
      birthdayValid &&
      dropdownValid &&
      emailValid &&
      phoneValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
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

    isNameValid(name) {
      const nameRegex = /[a-zA-Z]$/;

      return nameRegex.test(name);
    },

    isBirthdayValid(birthday) {
      const birthdayRegex = /(\d{2})\/?(\d{2})\/?(\d{4})$/;

      return birthdayRegex.test(birthday);
    },

    isEmailValid(email) {
      const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}/g;

      return emailRegex.test(email);
    },

    isPhoneValid(phone) {
      const phoneRegex = /(\d{2})\d{5}\d{4}/g;

      return phoneRegex.test(phone);
    },

    isPasswordValid(password) {
      const minLength = password.length >= 10;
      const uppercase = /[A-Z]/g.test(password);
      const number = /[0-9]/g.test(password);
      const specialCharacter = /[!@#$%^&*{}<>;'(),.?":|]/g.test(password);

      return minLength && uppercase && number && specialCharacter;
    },
  },
);
