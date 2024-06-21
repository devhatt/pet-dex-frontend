import { Component } from 'pet-dex-utilities';
import eyeIconDisable from './img/eye-icon-disable.svg';
import eyeIcon from './img/eye-icon.svg';
import './index.scss';

const events = [
  'error',
  'placeholder:changed',
  'asset:changed',
  'disabled',
  'enabled',
  'value:change',
  'type:change',
];

const html = `
  <div class="input-text-container" data-select="input-text-container">
    <input class="input-text-container__input"  data-select="input-text" type="text" placeholder="">
    <button type="button" class="input-text-container__button input-text-container__button--hidden" data-select="show-text">
      <img class="input-text-container__image" data-select="show-text-img" src=${eyeIconDisable} alt="Toggle">
    </button>
  </div>
`;

export default function TextInput({
  placeholder = '',
  assetUrl,
  assetPosition,
  variation = 'standard',
  value = '',
  type = '',
} = {}) {
  Component.call(this, { html, events });
  const input = this.selected.get('input-text');
  const iconBtn = this.selected.get('show-text');
  const iconImg = this.selected.get('show-text-img');
  input.disabled = false;

  this.setPlaceholder(placeholder);
  input.classList.add(variation);
  input.style.backgroundImage = `url(${assetUrl})`;
  input.classList.add(assetPosition);
  this.setValue(value);
  this.setType(type);

  if (type === 'password') {
    iconBtn.classList.remove('input-text-container__button--hidden');
  }

  input.addEventListener('focus', () => {
    if (input.disabled) return;
    input.classList.remove('input-error');
  });

  input.addEventListener('input', (e) => {
    const newValue = e.target.value;
    this.setValue(newValue);
  });

  iconBtn.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
    iconImg.src = iconImg.src.includes('disable') ? eyeIcon : eyeIconDisable;
  });
}

TextInput.prototype = Object.assign(TextInput.prototype, Component.prototype, {
  setPlaceholder(placeholder) {
    this.selected.get('input-text').placeholder = placeholder;
    this.emit('placeholder:changed', placeholder);
  },
  setAsset(url) {
    this.selected.get('input-text').style.backgroundImage = `url(${url})`;
    this.emit('asset:changed');
  },
  setValue(value) {
    this.selected.get('input-text').value = value;
    this.emit('value:change', value);
  },
  setAssetPosition(position) {
    this.selected.get('input-text').classList.remove('prefix', 'suffix');
    this.selected.get('input-text').classList.add(position);
  },
  setVariation(standardOrOutlined) {
    this.selected.get('input-text').classList.remove('outlined', 'standard');
    this.selected.get('input-text').classList.add(standardOrOutlined);
  },
  inputError() {
    this.selected.get('input-text').classList.add('input-error');
    this.emit('error');
  },
  disable() {
    this.selected.get('input-text').disabled = true;
    this.emit('disabled');
  },
  enable() {
    this.selected.get('input-text').disabled = false;
    this.emit('enabled');
  },
  getValue() {
    return this.selected.get('input-text').value;
  },
  toggle() {
    if (this.selected.get('input-text').disabled) {
      this.enable();
    } else {
      this.disable();
    }
  },
  setType(type) {
    this.selected.get('input-text').type = type;
    this.emit('type:change', type);
  },
});
