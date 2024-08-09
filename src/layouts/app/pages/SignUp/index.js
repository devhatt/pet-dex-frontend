import { Component } from 'pet-dex-utilities';

import './index.scss';

import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import googleIcon from './images/google-icon.svg';
import facebookIcon from './images/facebook-icon.svg';

const events = ['signUp'];

const html = `
  <article class="signup-page">
    <section>
      <h2 class="signup-page__title">Crie sua petconta</h2>
      <section class="signup-page__provider">
        <button class="signup-page__provider-button"><img class="signup-page__provider-icon" src=${googleIcon} alt="Google icon">Google</button>
        <button class="signup-page__provider-button"><img class="signup-page__provider-icon" src=${facebookIcon} alt="Facebook Icon"><span>Facebook</span></button>
      </section>

      <section class="signup-page__separator">
        <hr class="signup-page__divisor">
        <span class="signup-page__separator-text">Ou</span>
        <hr class="signup-page__divisor">
      </section>
    </section>

    <form class="signup-page__form" action="submit">
      <div>
        <label data-select="name-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Nome</span>
        </label>
      </div>
      <div>
        <label data-select="last-name-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Sobrenome</span>
        </label>
      </div>
      <div>
        <label data-select="birth-date-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Data de nascimento</span>
        </label>
      </div>
      <div>
        <label data-select="local-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Local</span>
        </label>
      </div>
      <div>
        <label data-select="email-input" class="signup-page__form-input">
          <span class="signup-page__form-label">E-mail</span>
        </label>
        <span data-select="email-input-error" class="signup-page__form-input--error"></span>
      </div>
      <div>
        <label data-select="phone-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Celular</span>
        </label>
      </div>
      <div>
        <label data-select="password-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Senha</span>
        </label>
        <span data-select="password-input-error" class="signup-page__form-input--error"></span>
      </div>
      <div>
        <label data-select="confirm-password-input" class="signup-page__form-input">
          <span class="signup-page__form-label">Confirmar senha</span>
        </label>
        <span data-select="confirm-password-input-error" class="signup-page__form-input--error"></span>
      </div>
      <div class="signup-page__submit-button" data-select="submit-button"></div>
    </form>
  </article>
`;

export default function SignUp() {
  Component.call(this, { html, events });

  const $nameInputContainer = this.selected.get('name-input');
  const $lastNameInputContainer = this.selected.get('last-name-input');
  const $birthDateInputContainer = this.selected.get('birth-date-input');
  const $localInputContainer = this.selected.get('local-input');
  const $emailInputContainer = this.selected.get('email-input');
  const $phoneInputContainer = this.selected.get('phone-input');
  const $passwordInputContainer = this.selected.get('password-input');
  const $confirmPasswordInputContainer = this.selected.get(
    'confirm-password-input',
  );
  const $submitButton = this.selected.get('submit-button');
  const $emailErrorMessage = this.selected.get('email-input-error');
  const $passwordErrorMessage = this.selected.get('password-input-error');
  const $confirmPasswordErrorMessage = this.selected.get(
    'confirm-password-input-error',
  );

  const nameInput = new TextInput({
    placeholder: 'Devhat',
  });
  const lastNameInput = new TextInput({
    placeholder: 'Devhat',
  });
  const birthDateInput = new TextInput({
    placeholder: '13/12/1995',
    type: 'date',
  });
  const localInput = new TextInput({
    placeholder: 'São Paulo, SP',
  });
  const emailInput = new TextInput({
    placeholder: 'dev@devhat.com.br',
    type: 'email',
  });
  const phoneInput = new TextInput({
    placeholder: '(11) 92875-3356',
  });
  const passwordInput = new TextInput({
    placeholder: 'Senha',
    assetPosition: 'suffix',
    type: 'password',
  });
  const confirmPasswordInput = new TextInput({
    placeholder: 'Confirmar senha',
    assetPosition: 'suffix',
    type: 'password',
  });
  const submitButton = new Button({
    text: 'Cadastrar',
    isFullWidth: true,
    isDisabled: true,
  });

  nameInput.mount($nameInputContainer);
  lastNameInput.mount($lastNameInputContainer);
  birthDateInput.mount($birthDateInputContainer);
  localInput.mount($localInputContainer);
  emailInput.mount($emailInputContainer);
  phoneInput.mount($phoneInputContainer);
  passwordInput.mount($passwordInputContainer);
  confirmPasswordInput.mount($confirmPasswordInputContainer);
  submitButton.mount($submitButton);

  const validateFields = () => {
    const name = nameInput.getValue().trim();
    const lastName = lastNameInput.getValue().trim();
    const birthDate = birthDateInput.getValue().trim();
    const local = localInput.getValue().trim();
    const email = emailInput.getValue().trim();
    const phone = phoneInput.getValue().trim();
    const password = passwordInput.getValue().trim();
    const confirmPassword = confirmPasswordInput.getValue().trim();

    const allFieldsFilled =
      name &&
      lastName &&
      birthDate &&
      local &&
      email &&
      phone &&
      password &&
      confirmPassword;

    if (allFieldsFilled) {
      submitButton.enable();
    } else {
      submitButton.disable();
    }
  };

  nameInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  lastNameInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  birthDateInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  localInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  emailInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  phoneInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  passwordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  confirmPasswordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);

  submitButton.listen('click', () => {
    const email = emailInput.getValue();
    const password = passwordInput.getValue();
    const confirmPassword = confirmPasswordInput.getValue();
    let validEmail = true;
    let validPassword = true;
    let validConfirmPassword = true;

    if (!this.validateEmail(email)) {
      validEmail = false;
      $emailErrorMessage.classList.add('signUp-page__form-input--show-error');
      $emailErrorMessage.innerText = 'E-mail inválido';
      emailInput.inputError();
    }

    if (!this.validatePassword(password)) {
      validPassword = false;
      $passwordErrorMessage.classList.add(
        'signUp-page__form-input--show-error',
      );
      $passwordErrorMessage.innerText =
        'Senha inválida. Sua senha deve conter no mínimo 10 caracteres, incluindo pelo menos um caractere especial e uma letra maiúscula.';
      passwordInput.inputError();
    }

    if (!this.validateConfirmPassword(password, confirmPassword)) {
      validConfirmPassword = false;
      $confirmPasswordErrorMessage.classList.add(
        'signUp-page__form-input--show-error',
      );
      $confirmPasswordErrorMessage.innerText = 'As senhas não coincidem.';
      confirmPasswordInput.inputError();
    }

    if (validEmail)
      $emailErrorMessage.classList.remove(
        'signUp-page__form-input--show-error',
      );
    if (validPassword)
      $passwordErrorMessage.classList.remove(
        'signUp-page__form-input--show-error',
      );

    if (validConfirmPassword)
      $confirmPasswordErrorMessage.classList.remove(
        'signUp-page__form-input--show-error',
      );

    if (validEmail && validPassword && validConfirmPassword) {
      this.signUp();
    }
  });
}

SignUp.prototype = Object.assign(SignUp.prototype, Component.prototype, {
  signUp() {
    this.emit('signUp');
  },
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailRegex.test(email);
  },
  validatePassword(password) {
    const hasMinLength = password.length >= 10;
    const hasUppercase = /[A-Z]/g.test(password);
    const hasNumber = /[0-9]/g.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/g.test(password);

    return hasMinLength && hasUppercase && hasNumber && hasSpecialCharacter;
  },

  validateConfirmPassword(password, confirmpassword) {
    return password === confirmpassword;
  },
});
