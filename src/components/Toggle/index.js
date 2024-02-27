import './index.scss';
import { Component, createIDFactory } from 'pet-dex-utilities';

const generateID = createIDFactory('toggle');

const events = ['toggle'];

const html = `
  <div class="toggle-container">
    <input type="checkbox" id="toggle-input" class="toggle-container__input" data-select="toggle-input">
    <label for="toggle-input" class="toggle-container__label" data-select="toggle-label"></label>
  </div>
`;

export default function Toggle(checked) {
  Component.call(this, { html, events });

  const id = generateID();
  this.selected.get('toggle-input').setAttribute('id', id);
  this.selected.get('toggle-label').setAttribute('for', id);

  this.toggle(checked);
  this.selected.get('toggle-input').addEventListener('change', () => {
    checked = !checked;
    this.toggle(checked);
  });
}

Toggle.prototype = Object.assign(Toggle.prototype, Component.prototype, {
  toggle(checked) {
    if (checked) {
      this.selected.get('toggle-label').classList.add('toggle-container__label--checked');
    } else {
      this.selected.get('toggle-label').classList.remove('toggle-container__label--checked');
    }
    this.emit('toggle');
  },
});
