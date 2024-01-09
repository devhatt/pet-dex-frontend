import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'input:error',
  'inputPlaceholder:changed',
  'inputAsset:changed',
  'input:disabled',
  'input:enabled',
];

const html = `
    <div class="input-text-container">
      <input class="input-text-container__input" type="text" data-select="input-text" placeholder="">
    </div>
`;

export default function InputText({
  placeholder,
  assetUrl,
  assetPosition,
  variation,
}) {
  Component.call(this, { html, events });
  this.disabled = false;

  this.setPlaceholder(placeholder);
  this.selected.get('input-text').classList.add(variation);
  this.selected.get('input-text').backgroundImage = assetUrl;
  this.selected.get('input-text').classList.add(assetPosition);

  this.selected.get('input-text').addEventListener('focus', () => {
    if (this.disabled) return;
    this.classList.remove('input-error');
  });
}

InputText.prototype = Object.assign(InputText.prototype, Component.prototype, {
  setPlaceholder(placeholder) {
    this.selected.get('input-text').placeholder = placeholder;
    this.emit('inputPlaceholder:changed', placeholder);
  },
  setAsset(url) {
    this.selected.get('input-text').backgroundImage = `url(${url})`;
    this.emit('inputAsset:changed');
  },
  isStandard() {
    this.selected.get('input-text').classList.add('standard');
    this.selected.get('input-text').classList.remove('outlined');
  },
  isOutlined() {
    this.selected.get('input-text').classList.add('outlined');
    this.selected.get('input-text').classList.remove('standart');
  },
  inputError() {
    this.selected.get('input-text').classList.add('input-error');
    this.emit('input:error');
  },
  disable() {
    this.disabled = true;
    this.emit('input:disabled');
  },
  enable() {
    this.disabled = false;
    this.emit('input:enabled');
  },
});
