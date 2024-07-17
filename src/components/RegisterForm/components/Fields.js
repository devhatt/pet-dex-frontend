import { Component } from 'pet-dex-utilities';
import Dropdown from '../../Dropdown/index';
import Button from '../../Button/index';
import TextInput from '../../TextInput/index';

const html = `
    <div class="register-form">
      <div>
          <label class="label">Nome</label>
          <div class="input" data-select="name"></div>
          <span class="error-message" data-select="name-error"></span>
      </div>
      <div>
          <label class="label">Sobrenome</label>
          <div class="input" data-select="surname"></div>
          <span class="error-message" data-select="surname-error"></span>
      </div>
      <div>
          <label class="label">Data de nascimento</label>
          <div class="input" data-select="birth"></div>
          <span class="error-message" data-select="birth-error"></span>
      </div>
      <div>
          <label class="label">Local</label>
          <div class="location" data-select="location"></div>
          <span class="error-message" data-select="location-error"></span>
      </div>
      <div>
          <label class="label">E-mail</label>
          <div class="input" data-select="email"></div>
          <span class="error-message" data-select="email-error"></span>
      </div>
      <div>
          <label class="label">Celular</label>
          <div class="input" data-select="phone"></div>
          <span class="error-message" data-select="phone-error"></span>
      </div>
      <div>
          <label class="label">Senha</label>
          <div class="input" data-select="password"></div>
          <span class="error-message" data-select="password-error"></span>
      </div>
      <div>
          <label class="label">Confirmar senha</label>
          <div class="input" data-select="repeat-password"></div>
          <span class="error-message" data-select="repeat-password-error"></span>
      </div>
      <div class="register-button" data-select="form-button"></div>
    </div>
`;

export function Fields() {
  Component.call(this, { html });

  const $nameInputContainer = this.selected.get('name');
  const $nameErrorMessage = this.selected.get('name-error');

  const $surnameInputContainer = this.selected.get('surname');
  const $surnameErrorMessage = this.selected.get('surname-error');

  const $birthInputContainer = this.selected.get('birth');
  const $birthErrorMessage = this.selected.get('birth-error');

  const $emailInputContainer = this.selected.get('email');
  const $emailErrorMessage = this.selected.get('email-error');

  const $phoneInputContainer = this.selected.get('phone');
  const $phoneErrorMessage = this.selected.get('phone-error');

  const $passwordInputContainer = this.selected.get('password');
  const $passwordErrorMessage = this.selected.get('password-error');

  const $repeatPasswordInputContainer = this.selected.get('repeat-password');
  const $repeatPasswordErrorMessage = this.selected.get(
    'repeat-password-error',
  );

  const $locationInputContainer = this.selected.get('location');
  const $locationErrorMessage = this.selected.get('location-error');

  const $registerButtonContainer = this.selected.get('form-button');

  const nameInput = new TextInput({
    placeholder: 'Devhat',
    variation: 'standard',
  });

  const surnameInput = new TextInput({
    placeholder: 'DevHat',
    variation: 'standard',
  });

  const birthInput = new TextInput({
    placeholder: '13/12/1995',
    variation: 'standard',
  });

  const locationInput = new Dropdown({
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
    variation: 'standard',
  });

  const phoneInput = new TextInput({
    placeholder: '(11) 92875-3356',
    variation: 'standard',
  });

  const passwordInput = new TextInput({
    placeholder: '*********',
    variation: 'standard',
  });

  const repeatPasswordInput = new TextInput({
    placeholder: '*********',
    variation: 'standard',
  });

  const registerButton = new Button({
    text: 'Cadastrar',
    isFullWidth: true,
    isDisabled: false,
  });

  nameInput.selected.get('input-text').type = 'text';
  nameInput.selected.get('input-text').classList.add('input-text');
  nameInput.selected.get('input-text').id = 'name';
  nameInput.mount($nameInputContainer);

  surnameInput.selected.get('input-text').type = 'text';
  surnameInput.selected.get('input-text').classList.add('input-text');
  surnameInput.selected.get('input-text').id = 'surname';
  surnameInput.mount($surnameInputContainer);

  birthInput.selected.get('input-text').type = 'text';
  birthInput.selected.get('input-text').classList.add('input-text');
  birthInput.selected.get('input-text').id = 'birth';
  birthInput.mount($birthInputContainer);

  locationInput.selected.get('dropdown-toggle').classList.add('dropdown-input');
  locationInput.selected.get('dropdown-toggle').id = 'location';
  locationInput.mount($locationInputContainer);

  emailInput.selected.get('input-text').type = 'email';
  emailInput.selected.get('input-text').classList.add('input-text');
  emailInput.selected.get('input-text').id = 'email';
  emailInput.mount($emailInputContainer);

  phoneInput.selected.get('input-text').type = 'text';
  phoneInput.selected.get('input-text').classList.add('input-text');
  phoneInput.selected.get('input-text').id = 'phone';
  phoneInput.mount($phoneInputContainer);

  passwordInput.selected.get('input-text').type = 'password';
  passwordInput.selected.get('input-text').classList.add('input-text');
  passwordInput.selected.get('input-text').id = 'password';
  passwordInput.mount($passwordInputContainer);

  repeatPasswordInput.selected.get('input-text').type = 'password';
  repeatPasswordInput.selected.get('input-text').classList.add('input-text');
  repeatPasswordInput.selected.get('input-text').id = 'repeat-password';
  repeatPasswordInput.mount($repeatPasswordInputContainer);

  registerButton.selected.get('button');
  registerButton.selected.get('button').classList.add('register-btn');
  registerButton.mount($registerButtonContainer);

  registerButton.listen('click', () => {
    const nameValue = nameInput.selected.get('input-text').value;
    const surnameValue = surnameInput.selected.get('input-text').value;
    const birthValue = birthInput.selected.get('input-text').value;
    const locationValue =
      locationInput.selected.get('dropdown-selected').dataset;
    const emailValue = emailInput.selected.get('input-text').value;
    const phoneValue = phoneInput.selected.get('input-text').value;
    const passwordValue = passwordInput.selected.get('input-text').value;
    const repeatPasswordValue =
      repeatPasswordInput.selected.get('input-text').value;

    let nameValid = true;
    let surnameValid = true;
    let birthValid = true;
    let locationValid = true;
    let emailValid = true;
    let phoneValid = true;
    let passwordValid = true;
    let repeatPasswordValid = true;

    if (!this.isNameValid(nameValue)) {
      nameValid = false;
      $nameErrorMessage.classList.add('show-error');
      $nameErrorMessage.innerText = 'Informe seu nome';
      nameInput.inputError();
    }

    if (!this.isSurnameValid(surnameValue)) {
      surnameValid = false;
      $surnameErrorMessage.classList.add('show-error');
      $surnameErrorMessage.innerText = 'Informe seu sobrenome';
      surnameInput.inputError();
    }

    if (!this.isBirthValid(birthValue)) {
      birthValid = false;
      $birthErrorMessage.classList.add('show-error');
      $birthErrorMessage.innerText = 'Informe sua data de nascimento';
      birthInput.inputError();
    }

    if (!locationValue.value) {
      locationValid = false;
      $locationErrorMessage.classList.add('show-error');
      locationInput.selected
        .get('dropdown-toggle')
        .classList.add('dropdown-form__show-error-dropdown');
      $locationErrorMessage.innerText = 'Selecione sua cidade';
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
      !this.isRepeatPasswordValid(repeatPasswordValue) ||
      passwordValue !== repeatPasswordValue
    ) {
      repeatPasswordValid = false;
      $repeatPasswordErrorMessage.classList.add('show-error');
      $repeatPasswordErrorMessage.innerText = 'Senhas diferentes';
      repeatPasswordInput.inputError();
    }

    if (nameValid) $nameErrorMessage.classList.remove('show-error');
    if (surnameValid) $surnameErrorMessage.classList.remove('show-error');
    if (birthValid) $birthErrorMessage.classList.remove('show-error');
    if (locationValid) {
      $locationErrorMessage.classList.remove('show-error');
      locationInput.selected
        .get('dropdown-toggle')
        .classList.remove('dropdown-form__show-error-dropdown');
    }
    if (emailValid) $emailErrorMessage.classList.remove('show-error');
    if (phoneValid) $phoneErrorMessage.classList.remove('show-error');
    if (passwordValid) $passwordErrorMessage.classList.remove('show-error');
    if (repeatPasswordValid)
      $repeatPasswordErrorMessage.classList.remove('show-error');

    if (
      nameValid &&
      surnameValid &&
      birthValid &&
      locationValid &&
      emailValid &&
      phoneValid &&
      passwordValid &&
      repeatPasswordValid
    ) {
      this.register();
    }
  });
}

Fields.prototype = Object.assign(Fields.prototype, Component.prototype, {
  isNameValid(name) {
    return name;
  },

  isSurnameValid(surname) {
    return surname;
  },

  isBirthValid(birth) {
    return birth;
  },

  isEmailValid(email) {
    return email;
  },

  isPhoneValid(phone) {
    return phone;
  },

  isPasswordValid(password) {
    return password;
  },

  isRepeatPasswordValid(repeatPassword) {
    return repeatPassword;
  },
});
