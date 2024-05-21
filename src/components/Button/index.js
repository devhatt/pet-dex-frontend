import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['click', 'text:change', 'enable', 'disable'];

const html = `
    <button data-select="button" class="button" type="button"></button>
`;

export default function Button({
  text = '',
  isFullWidth = false,
  isDisabled = false,
} = {}) {
  Component.call(this, { html, events });

  this.setText(text);
  this.setIsFullWidth(isFullWidth);
  this.setIsDisabled(isDisabled);

  const $button = this.selected.get('button');

  const handleClick = () => {
    this.click();
  };

  this.listen('mount', () => {
    $button.addEventListener('click', handleClick);
  });

  this.listen('unmount', () => {
    $button.removeEventListener('click', handleClick);
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

  disable() {
    this.selected.get('button').disabled = true;
    this.emit('disable');
  },

  enable() {
    this.selected.get('button').disabled = false;
    this.emit('enable');
  },

  setIsDisabled(isDisabled = false) {
    if (isDisabled) this.disable();
    else this.enable();
  },

  isDisabled() {
    return this.selected.get('button').disabled;
  },

  click() {
    if (this.isDisabled()) return;
    this.emit('click');
  },
});
