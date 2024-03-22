import { Component, createIDFactory } from 'pet-dex-utilities';
import './index.scss';

const generateID = createIDFactory('toggle');

const events = ['toggle'];

const html = `
  <div class="toggle-container">
    <input type="checkbox" class="toggle-container__input" data-select="toggle-input">
    <label class="toggle-container__label" data-select="toggle-label"></label>
  </div>
`;

export default function Toggle({ checked = false } = {}) {
  Component.call(this, { html, events });

  const id = generateID();
  this.selected.get('toggle-input').setAttribute('id', id);
  this.selected.get('toggle-label').setAttribute('for', id);

  this.setToggle(checked, false);

  this.selected
    .get('toggle-input')
    .addEventListener('change', () => this.emitToggle());
}

Toggle.prototype = Object.assign(Toggle.prototype, Component.prototype, {
  emitToggle() {
    this.emit('toggle', this.selected.get('toggle-input').checked);
  },
  setToggle(checked, emit = true) {
    this.selected.get('toggle-input').checked = checked;
    if (emit) this.emitToggle();
  },
});
