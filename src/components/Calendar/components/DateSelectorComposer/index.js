import { Component } from 'pet-dex-utilities';
import './index.scss';
import MonthSelector from './components/MonthSelector';
import { monthArrayGenerator } from './utils/monthArray';
import SelectorModal from './components/SelectorModal';

const events = [];

const html = `
    <div class="date-selector" data-select="date-selector"></div>
`;

export default function DateSelectorComposer(month, year) {
  Component.call(this, { html, events });

  this.month = month;
  this.year = year;
  this.$dateSelector = this.selected.get('date-selector');

  this.monthArray = monthArrayGenerator(month - 1);
  this.monthSelector = new MonthSelector(this.monthArray);
  this.monthSelector.mount(this.$dateSelector);

  this.modal = new SelectorModal(this.monthArray);
  this.modal.mount(this.$dateSelector);
}

DateSelectorComposer.prototype = Object.assign(
  DateSelectorComposer.prototype,
  Component.prototype,
  {},
);
