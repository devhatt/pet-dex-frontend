import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['active', 'inactive'];

const html = `
  <div class="toggle-container">
    <input type="checkbox" id="toggle-input" class="toggle-container__input" data-select="toggle-input">
    <label for="toggle-input" class="toggle-container__label" data-select="toggle-label"></label>
  </div>
`;

export default function Toggle() {
  Component.call(this, { html, events });

  this.selected.get('toggle-input').addEventListener('change', (e) => {
    const { checked } = e.target;

    if (checked) {
      this.notChecked();
    } else {
      this.isChecked();
    }
  });
}

Toggle.prototype = Object.assign(
  Toggle.prototype,
  Component.prototype,
  {
    isChecked() {
      this.selected.get('toggle-label').classList.add('checked');
      this.emit('active');
    },
    notChecked() {
      this.selected.get('toggle-label').classList.remove('checked');
      this.emit('inactive');
    },
  },
);
