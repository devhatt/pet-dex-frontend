import { Component } from 'pet-dex-utilities';
import TextInput from '../TextInput';
import Button from '../Button';
import Toggle from '../Toggle';
import './index.scss';

import pawIcon from './images/paw-form-icon.svg';
import eyeSlashIcon from './images/eye-slash.svg';
import googleIcon from './images/google-icon.svg';
import facebookIcon from './images/facebook-icon.svg';

const events = ['login'];

const html = `
  <div>
    <div class="login-form-container__container-paw-icon">
      <img class="paw-icon" src="${pawIcon}" alt="Ícone de uma pata de animal" />
    </div>
    
    <div class="login-form-container">
      <h2 class="login-form-container__title">Sua petconta</h2>
      <form data-select="login-form" class="login-form-container__login-form" action="submit">
        <div data-select="email-input-container"></div>
        <span data-select="email-error-message" class="error-message"></span>
        <div data-select="password-input-container"></div>
        <span data-select="password-error-message" class="error-message"></span>
      
        <div class="login-form-container__login-options">
          <div data-select="remember-option" class="remember-option">
            <p>Remember me</p>
          </div>
          <a href="#" class="forgot-password">Esqueceu a senha?</a>
        </div>
      </form>

      <span class="login-form-container__signup">Não tem uma conta? 
        <a href="#" class="signup-link">Inscreva-se</a>
      </span>

      <div class="login-form-container__separator">
        <hr class="divisor" />
        <span class="separator-text">Ou</span>
        <hr class="divisor" />
      </div>

      <div data-select="provider-container" class="login-form-container__provider-container">
        <button class="provider-button"><img src="${googleIcon}" class="icon"/ >Google</button>
        <button class="provider-button"><img src="${facebookIcon}" class="icon"/ >Facebook</button>
      </div>
    </div>
  </div>
`;

export default function LoginForm() {
  Component.call(this, { html, events });
  const $loginForm = this.selected.get('login-form');
  const $emailInputContainer = this.selected.get('email-input-container');
  const $passwordInputContainer = this.selected.get('password-input-container');
  const $rememberOption = this.selected.get('remember-option');
  const $emailErrorMessage = this.selected.get('email-error-message');
  const $passwordErrorMessage = this.selected.get('password-error-message');

  const emailInput = new TextInput({ placeholder: 'E-mail' });
  const passwordInput = new TextInput({
    placeholder: 'Senha',
    assetUrl: eyeSlashIcon,
    assetPosition: 'suffix',
  });
  const toggle = new Toggle({ checked: false });
  const submitButton = new Button({
    text: 'Entrar',
    isFullWidth: true,
    isDisabled: true,
  });

  emailInput.mount($emailInputContainer);
  passwordInput.mount($passwordInputContainer);
  submitButton.mount($loginForm);
  toggle.mount($rememberOption);

  emailInput.selected.get('input-text').type = 'email';
  emailInput.selected.get('input-text').id = 'email';
  passwordInput.selected.get('input-text').type = 'password';

  const validateFields = () => {
    const email = emailInput.selected.get('input-text').value;
    const password = passwordInput.selected.get('input-text').value;

    if (email.trim() && password) {
      submitButton.enable();
    } else {
      submitButton.disable();
    }
  };

  emailInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  passwordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);

  submitButton.listen('click', () => {
    const email = emailInput.selected.get('input-text').value;
    const password = passwordInput.selected.get('input-text').value;
    let validEmail = true;
    let validPassword = true;

    if (!this.validateEmail(email)) {
      validEmail = false;
      $emailErrorMessage.classList.add('show-error');
      $emailErrorMessage.innerText = 'E-mail inválido';
      emailInput.inputError();
    }

    if (!this.validatePassword(password)) {
      validPassword = false;
      $passwordErrorMessage.classList.add('show-error');
      $passwordErrorMessage.innerText =
        'Senha inválida. Sua senha deve conter no mínimo 10 caracteres, incluindo pelo menos um caractere especial e uma letra maiúscula.';
      passwordInput.inputError();
    }

    if (validEmail) $emailErrorMessage.classList.remove('show-error');
    if (validPassword) $passwordErrorMessage.classList.remove('show-error');

    if (validEmail && validPassword) {
      this.login();
    }
  });
}

LoginForm.prototype = Object.assign(LoginForm.prototype, Component.prototype, {
  login() {
    this.emit('login');
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
});
