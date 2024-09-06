import { Component } from 'pet-dex-utilities';
import LoginForm from '../../../../components/LoginForm';
import petdexLogo from './images/petdex-logo__login-page.png';
import petAndDog from './images/pet-and-dog__login-page.png';
import './index.scss';

const html = `
   <div data-select="container" class="login-page">
            <div class="login-page__img-box">
                        <div class="login-page__img-top"> 
                              <img src="${petdexLogo}" class="login-page__img-logopetdex"/>
                        </div>
                        <div class="login-page__img-down">
                              <img src="${petAndDog}" class="login-page__img-petanddog"/>
                        </div>
                        
            </div>
            <div class=login-page__login-box>

                  <div class="login-page__login-form">
                  </div>
            </div>

    </div>
`;
export default function LoginPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');
  this.LoginForm = new LoginForm();
  this.LoginForm.mount($container);
}

LoginPage.prototype = Object.assign(LoginPage.prototype, Component.prototype);
