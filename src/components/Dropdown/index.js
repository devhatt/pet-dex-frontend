import { Component } from 'pet-dex-utilities';
import DropdownItem from './components/DropdownItem';
import './index.scss';

const events = [
  'select',
  'unselect',
  'item:add',
  'item:remove',
  'open',
  'close',
  'value:change',
  'text:change',
  'items:clear',
];

const html = `
  <div class="dropdown" data-select="dropdown-container">
    <div class="dropdown__toggle" data-select="dropdown-toggle">
      <span class="dropdown__selected dropdown__selected--label" data-select="dropdown-selected"></span>
      <span class="dropdown__icon" data-select="dropdown-icon">
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="overflow: visible; color: currentcolor;" height="1em" width="1em">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </span>
    </div>
    <ul class="dropdown__options" data-select="dropdown-options"></ul>
  </div>
`;

export default function Dropdown({
  items = [],
  placeholder = 'Select an option',
  value = null,
  cssClass = '',
} = {}) {
  Component.call(this, { html, events });

  this.placeholder = placeholder;
  this.items = new Map();
  this.selectedItem = null;

  this.onSelect = (item) => {
    const existsAndIsDifferent = this.selectedItem !== null && this.selectedItem !== item;
    if (existsAndIsDifferent) this.selectedItem.unselect();

    this.selectedItem = item;
    this.setValue(item.getValue());
    this.emit('select', item);

    if (this.isOpen()) this.close();
  };

  this.onUnselect = (item) => {
    const isDifferent = this.selectedItem !== item;
    if (isDifferent) return;

    this.selectedItem = null;
    this.setValue(null);
    this.emit('unselect', item);
  };

  items.map((item) => this.addItem(item));
  this.setValue(value);

  this.selected
    .get('dropdown-toggle')
    .addEventListener('click', () => this.toggle());

  const closeOnClickOutside = (event) => {
    const isOutside = !event
      .composedPath()
      .includes(this.selected.get('dropdown-container'));

    if (!isOutside) return;

    if (this.isOpen()) this.close();
  };

  this.listen('mount', () => document.addEventListener('click', closeOnClickOutside));
  this.listen('unmount', () => document.removeEventListener('click', closeOnClickOutside));

  if (cssClass) {
    this.selected.get('dropdown-container').classList.add(cssClass);
  }
}

Dropdown.prototype = Object.assign(Dropdown.prototype, Component.prototype, {
  addItem(props = {}) {
    const item = new DropdownItem(props);
    const $list = this.selected.get('dropdown-options');
    item.mount($list);
    item.listen('select', this.onSelect);
    item.listen('unselect', this.onUnselect);
    this.items.set(props.value, item);
    this.emit('item:add', item);
  },

  removeItem(value = '') {
    if (!this.items.has(value)) throw new Error('Item not found');

    const item = this.items.get(value);
    item.unmount();
    this.items.delete(value);

    if (item.getValue() === this.getValue()) {
      this.setValue(null);
    }

    this.emit('item:remove', item);
  },

  isOpen() {
    return this.selected
      .get('dropdown-container')
      .classList.contains('dropdown--open');
  },

  toggle(condition = this.isOpen()) {
    if (condition) this.close();
    else this.open();
  },

  open() {
    const $container = this.selected.get('dropdown-container');
    $container.classList.add('dropdown--open');
    this.emit('open');
  },

  close() {
    const $container = this.selected.get('dropdown-container');
    $container.classList.remove('dropdown--open');
    this.emit('close');
  },

  getValue() {
    const { value } = this.selected.get('dropdown-selected').dataset;
    return value;
  },

  setValue(value = null) {
    if (value === null) {
      if (this.selectedItem !== null) {
        this.selectedItem.unselect();
        return;
      }

      this.setText(this.placeholder, true);
      this.emit('value:change', null);
      delete this.selected.get('dropdown-selected').dataset.value;

      return;
    }

    if (!this.items.has(value)) return;

    const item = this.items.get(value);
    this.setText(item.getText());
    this.selected.get('dropdown-selected').dataset.value = item.getValue();
    this.emit('value:change', item.getValue());
  },

  getText() {
    return this.selected.get('dropdown-selected').textContent;
  },

  setText(text = '', isPlaceholder = false) {
    const $container = this.selected.get('dropdown-selected');
    $container.classList.toggle('dropdown__selected--label', isPlaceholder);
    $container.textContent = text;
    this.emit('text:change', text);
  },

  clearItems() {
    this.items.forEach((item) => this.removeItem(item.getValue()));
    this.close();
    this.emit('items:clear', this);
  },
});
