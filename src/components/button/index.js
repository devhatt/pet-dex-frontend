import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['click'];

const html = `
    <button data-select="button" class="button" type="button"></button>
`;

export default function Button() {
  Component.call(this, { html, events });

  const $button = this.selected.get('button');
  $button.addEventListener('click', () => {
    this.click();
  });
}

Button.prototype = Object.assign(Button.prototype, Component.prototype, {
  getText() {
    return this.selected.get('button').textContent;
  },

  setText(text) {
    this.selected.get('button').textContent = text;
  },

  isBlock() {
    return this.selected.get('button').classList.has('button--block');
  },

  setIsBlock(isBlock) {
    const { classList } = this.selected.get('button');
    if (isBlock) classList.add('button--block');
    else classList.remove('button--block');
  },

  click() {
    this.emit('click');
  },
});
