import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['click'];

const html = `
    <button data-select="button" class="button" type="button"></button>
`;

export default function Button({ text = '', isFullWidth = false }) {
  Component.call(this, { html, events });

  this.setText(text);
  this.setIsFullWidth(isFullWidth);

  const $button = this.selected.get('button');
  $button.addEventListener('click', () => {
    this.click();
  });
}

Button.prototype = Object.assign(Button.prototype, Component.prototype, {
  getText() {
    return this.selected.get('button').textContent;
  },

  setText(text = '') {
    this.selected.get('button').textContent = text;
    this.emit('text:change', text);
  },

  isFullWidth() {
    return this.selected.get('button').classList.has('button--block');
  },

  setIsFullWidth(isFullWidth = false) {
    const { classList } = this.selected.get('button');
    if (isFullWidth) classList.add('button--block');
    else classList.remove('button--block');
  },

  click() {
    this.emit('click');
  },
});
