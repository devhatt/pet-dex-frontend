import { Component } from 'pet-dex-utilities';
import './index.scss';
import MonthSelector from './components/MonthSelector';
import { monthArrayGenerator } from './utils/monthArray';
import { ModalController } from './utils/ModalController';

const events = [];

const html = `
    <div class="date-selector" data-select="date-selector"></div>
`;

export default function DateSelectorComposer(month, year) {
  Component.call(this, { html, events });

  this.month = month;
  this.year = year;
  this.$dateSelector = this.selected.get('date-selector');
  this.modalControl = new ModalController(this);

  this.monthArray = monthArrayGenerator(month - 1);
  this.monthSelector = new MonthSelector(this.monthArray);
  this.monthSelector.mount(this.$dateSelector);
  this.monthSelector.listen('selector:click', () =>
    this.modalControl.Open(this.monthArray),
  );

  window.addEventListener('click', (event) =>
    this.modalControl.CloseOnClickOutside(event),
  );
}

DateSelectorComposer.prototype = Object.assign(
  DateSelectorComposer.prototype,
  Component.prototype,
  {},
);
