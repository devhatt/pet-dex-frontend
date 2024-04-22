import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['text:change', 'value:change', 'select', 'unselect'];

const html = `
    <li data-select='option' class="dropdown__options--option"></li>
`;

export default function DropdownItem({ text = '', value = '' } = {}) {
  Component.call(this, { html, events });

  this.setText(text);
  this.setValue(value);

  this.selected.get('option').addEventListener('click', () => this.toggle());
}

DropdownItem.prototype = Object.assign(
  DropdownItem.prototype,
  Component.prototype,
  {
    getText() {
      return this.selected.get('option').textContent;
    },

    setText(text = '') {
      this.emit('text:change', text);
      this.selected.get('option').textContent = text;
    },

    getValue() {
      return this.selected.get('option').dataset.value;
    },

    setValue(value = '') {
      this.emit('value:change', value);
      this.selected.get('option').dataset.value = value;
    },

    isSelected() {
      return this.selected.get('option').dataset.selected === 'true';
    },

    toggle(condition = this.isSelected()) {
      if (condition) this.unselect();
      else this.select();
    },

    select() {
      this.selected.get('option').dataset.selected = true;
      this.emit('select', this);
    },

    unselect() {
      this.selected.get('option').dataset.selected = false;
      this.emit('unselect', this);
    },

    toJSON() {
      return {
        text: this.getText(),
        value: this.getValue(),
      };
    },
  },
);
