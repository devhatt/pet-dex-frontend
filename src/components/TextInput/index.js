import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'error',
  'placeholder:changed',
  'asset:changed',
  'disabled',
  'enabled',
];

const html = `
    <div class="input-text-container">
      <input class="input-text-container__input" type="text" data-select="input-text" placeholder="">
    </div>
`;

export default function TextInput({
  placeholder,
  assetUrl,
  assetPosition,
  variation,
}) {
  Component.call(this, { html, events });
  const input = this.selected.get('input-text');
  input.disabled = false;

  this.setPlaceholder(placeholder);
  input.classList.add(variation);
  input.style.backgroundImage = `url(${assetUrl})`;
  input.classList.add(assetPosition);

  input.addEventListener('focus', () => {
    if (input.disabled) return;
    input.classList.remove('input-error');
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
  toggle() {
    if (this.selected.get('input-text').disabled) {
      this.enable();
    } else {
      this.disable();
    }
  },
});
