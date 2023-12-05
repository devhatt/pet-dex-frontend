import Button from '../../../components/button';
import Component from '../../../components/component';
import Input from '../../../components/input';
import html from './index.html?raw';
import './index.scss';

const events = ['login'];

export default function Login() {
  Component.call(this, { html, events });

  this.input = new Input();
  this.input.setLabel('Username');
  this.input.selected.get('input').setAttribute('required', 'true');

  this.button = new Button();
  this.button.setText('Login');
  this.button.selected
    .get('button')
    .addEventListener('click', (event) => this.submit());

  const $form = this.selected.get('form');
  $form.addEventListener('submit', (event) => this.submit());

  this.input.mount($form);
  this.button.mount($form);
}

Login.prototype = Object.assign(Login.prototype, Component.prototype, {
  getData() {
    return {
      name: this.input.getValue(),
    };
  },

  submit() {
    const $form = this.selected.get('form');
    const valid = $form.reportValidity();
    if (!valid) return;

    this.emit('login', this.getData());
    $form.reset();
  },
});
