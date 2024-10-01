import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['item:click'];

const html = `
  <span class="date-selected" data-select="date-selected"></span>
`;

export default function DateSelected({ date = 1 }) {
  Component.call(this, { html, events });

  this.$dateSelected = this.selected.get('date-selected');
  this.setDate(date);

  this.$dateSelected.addEventListener('click', () => this.emit('item:click'));
}

DateSelected.prototype = Object.assign(
  DateSelected.prototype,
  Component.prototype,
  {
    setDate(date) {
      this.date = date;
      this.$dateSelected.innerText = date;
    },

    getDate() {
      return this.date;
    },
  },
);
