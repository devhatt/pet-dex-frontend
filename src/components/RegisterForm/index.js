import { Component } from 'pet-dex-utilities';
import { Fields } from './components/Fields';
import googleIcon from './images/google-icon.png';
import facebookIcon from './images/facebook-icon.png';
import './index.scss';

const events = ['register'];

const html = `
    <div class="container">
        <h1 class="container__title">Crie sua petconta</h1>
        <div class="social-container">
            <div class="social-wrapper">
                <button class="social-login">
                    <img class="social-img" src=${googleIcon} >
                    Google
                </button>
                <button class="social-login">
                    <img class="social-img" src=${facebookIcon} >
                    Facebook
                </button>
            </div>
            <div class="divisor-container">
                <hr class="divisor">
                <span class="divisor-text">Ou</span>
                <hr class="divisor">
            </div>
        </div>
        <form action="submit" data-select="register-form">
          <div data-select="form-fields"></div>
        </form>
    </div>
`;

export default function RegisterForm() {
  Component.call(this, { html, events });

  const $formFieldsContainer = this.selected.get('form-fields');

  const formFields = new Fields();

  formFields.mount($formFieldsContainer);
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
