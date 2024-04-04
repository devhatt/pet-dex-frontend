import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'value:change', 'text:change', 'name:change', 'disable'];

const html = `
<label class="radio-container">
    <input data-select="radio-button" type="radio" name="" value="">
    <span data-select="radio-button-text" class="radio-dot"></span>
</label>
`;

export default function RadioButton({
  isChecked = false,
  text = '',
  value = '',
  name = '',
  isDisabled = false,
} = {}) {
  Component.call(this, { html, events });

  this.setChecked(isChecked);
  this.setText(text);
  this.setValue(value);
  this.setName(name);
  this.setDisabled(isDisabled);

  const $radioButton = this.selected.get('radio-button');

  $radioButton.addEventListener('change', (e) => {
    const isRealChecked = e.target.checked;
    this.setChecked(isRealChecked);
  });
}

RadioButton.prototype = Object.assign(
  RadioButton.prototype,
  Component.prototype,
  {
    isChecked() {
      return this.selected.get('radio-button').checked;
    },

    setChecked(isChecked = false) {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.checked = isChecked;
      this.emit('change', isChecked);
    },

    setText(text = '') {
      const $radioButtonText = this.selected.get('radio-button-text');
      $radioButtonText.textContent = text;
      this.emit('text:change', text);
    },
    getText() {
      return this.selected.get('radio-button-text').textContent;
    },
    setValue(value = '') {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.value = value;
      this.emit('value:change', value);
    },
    getValue() {
      return this.selected.get('radio-button').value;
    },
    isDisabled() {
      return this.selected.get('radio-button').disabled;
    },
    setDisabled(isDisabled = false) {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.disabled = isDisabled;
      this.emit('disable', isDisabled);
    },
    getName() {
      const $radioButton = this.selected.get('radio-button');
      return $radioButton.name;
    },

    setName(name = '') {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.name = name;
      this.emit('name:change', name);
    },
  },
);
