import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'text:change', 'disable', 'value:change'];

const html = `
    <label class="checkbox-container">
        <input data-select="checkbox" type="checkbox" value="">
        <span data-select="checkbox-text" class="checkmark"></span>
    </label>
`;

export default function Checkbox({ isChecked = false, name = '', text = '', isDisabled = false, value = '' } = {}) {
  Component.call(this, { html, events });

  this.setChecked(isChecked);
  this.setText(text);
  this.setName(name);
  this.setDisabled(isDisabled);
  this.setValue(value);

  const $checkbox = this.selected.get('checkbox');

  $checkbox.addEventListener('change', (e) => {
    const isRealChecked = e.target.checked;
    this.setChecked(isRealChecked);
  });
}

Checkbox.prototype = Object.assign(Checkbox.prototype, Component.prototype, {
  isChecked() {
    return this.selected.get('checkbox').checked;
  },

  setChecked(isChecked = false) {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.checked = isChecked;
    this.emit('change', isChecked);
  },

  setText(text = '') {
    const $checkboxText = this.selected.get('checkbox-text');
    $checkboxText.textContent = text;
    this.emit('text:change', text);
  },

  getText() {
    return this.selected.get('checkbox-text').textContent;
  },
  isDisabled() {
    return this.selected.get('checkbox').disabled;
  },

  setDisabled(isDisabled = false) {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.disabled = isDisabled;
    this.emit('disable', isDisabled);
  },

  setValue(value = '') {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.value = value;
    this.emit('value:change', value);
  },
  getValue() {
    return this.selected.get('checkbox').value;
  },
  getName() {
    const $checkbox = this.selected.get('checkbox');
    return $checkbox.name;
  },

  setName(name = '') {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.name = name;
    this.emit('name:change', name);
  },
});
