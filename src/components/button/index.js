import Component from '../component';
import html from './index.html?raw';
import './index.scss';

const events = ['click'];

export default function Button() {
  Component.call(this, { html, events });

  this.selected
    .get('button')
    .addEventListener('click', (event) => this.click());
}

Button.prototype = Object.assign(Button.prototype, Component.prototype, {
  getText() {
    return this.selected.get('button').textContent;
  },

  setText(val) {
    this.selected.get('button').textContent = val;
  },

  click() {
    this.emit('click');
  },
});
