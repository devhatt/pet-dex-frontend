import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'text:change', 'disable', 'value:change'];

const html = `
    <label class="checkbox-container">
        <input data-select="checkbox" class="checkbox-container__input" type="checkbox" value="">
        <span data-select="checkbox-text" class="checkbox-container__checkboxText"></span>
    </label>
`;

export default function Checkbox({ check = false, name = '', text = '', disabled = false, value = '' } = {}) {
  Component.call(this, { html, events });

  this.setCheck(check);
  this.setText(text);
  this.setName(name);
  this.setDisabled(disabled);
  this.setValue(value);

  const $checkbox = this.selected.get('checkbox');

  $checkbox.addEventListener('change', (e) => {
    this.setChecked(e.target.checked);
  });
}

Checkbox.prototype = Object.assign(Checkbox.prototype, Component.prototype, {
  isChecked() {
    return this.selected.get('checkbox').checked;
  },

  setCheck(check = false) {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.checked = check;
    this.emit('change', check);
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

  setDisabled(disabled = false) {
    const $checkbox = this.selected.get('checkbox');
    $checkbox.disabled = disabled;
    this.emit('disable', disabled);
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
