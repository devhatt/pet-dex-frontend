import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['item:click'];

const html = `
  <span class="date-selected" data-select="date-selected"></span>
`;

export default function DateSelected(date) {
  Component.call(this, { html, events });

  this.$dateSelected = this.selected.get('date-selected');
  this.setDate(date);

  this.emitClickevent = () => {
    this.emit('item:click');
  };

  this.$dateSelected.addEventListener('click', this.emitClickevent);
}

DateSelected.prototype = Object.assign(
  DateSelected.prototype,
  Component.prototype,
  {
    setDate(date) {
      this.$dateSelected.innerText = date;
    },
  },
);
