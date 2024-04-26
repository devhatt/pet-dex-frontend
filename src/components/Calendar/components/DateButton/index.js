import { Component } from 'pet-dex-utilities';
import './index.scss';

const html = `
  <li data-select="date" class="date"><button></button></li>
`;

export default function DateButton(date) {
  Component.call(this, { html });

  const $button = this.selected.get('date').children[0];
  $button.innerText = date;
}

DateButton.prototype = Object.assign(
  DateButton.prototype,
  Component.prototype,
  {
    active() {
      this.selected.get('date').classList.add('active');
    },
  },
);
