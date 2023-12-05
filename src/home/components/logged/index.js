import Button from '../../../components/button';
import Component from '../../../components/component';
import html from './index.html?raw';
import './index.scss';

const events = ['logout'];

export default function Logged() {
  Component.call(this, { html, events });

  this.button = new Button();
  this.button.setText('Logout');
  this.button.selected
    .get('button')
    .addEventListener('click', (event) => this.logout());

  this.elements.push(...this.button.elements);
}

Logged.prototype = Object.assign(Logged.prototype, Component.prototype, {
  getName() {
    return this.selected.get('name').textContent;
  },

  setName(val) {
    this.selected.get('name').textContent = val;
  },

  logout() {
    this.emit('logout');
  },
});
