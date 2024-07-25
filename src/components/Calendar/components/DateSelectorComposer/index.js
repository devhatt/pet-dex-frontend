import { Component } from 'pet-dex-utilities';
import './index.scss';
import MonthSelector from './components/MonthSelector';
import { ModalController } from './utils/ModalController';
import {
  yearArrayGenerator,
  monthArrayGenerator,
} from './utils/arraysGenerators';
import YearSelector from './components/YearSelector';

const events = ['month:change'];

const html = `
    <div class="date-selector" data-select="date-selector">
      <div class="date-selector__year" data-select="year-selector"></div>
      <div class="date-selector__month" data-select="month-selector"></div>
    </div>
`;

export default function DateSelectorComposer(month, year) {
  Component.call(this, { html, events });

  this.month = month;
  this.year = year;
  this.$dateSelector = this.selected.get('date-selector');
  this.$monthSelector = this.selected.get('month-selector');
  this.$yearSelector = this.selected.get('year-selector');
  this.modalControl = new ModalController(this);

  this.yearArray = yearArrayGenerator(this.year);
  this.monthArray = monthArrayGenerator(this.month);

  this.mountYearSelector = () => {
    if (this.yearSelector) this.yearSelector.unmount();

    this.yearSelector = new YearSelector(this.yearArray);
    this.yearSelector.mount(this.$yearSelector);
  };

  this.mountMonthSelector = () => {
    if (this.monthSelector) this.monthSelector.unmount();

    this.monthSelector = new MonthSelector(this.monthArray);
    this.monthSelector.mount(this.$monthSelector);
  };

  this.mountYearSelector();
  this.mountMonthSelector();

  this.$dateSelector.addEventListener('click', () =>
    this.modalControl.Open(this.monthArray, this.yearArray),
  );
  window.addEventListener('click', (event) =>
    this.modalControl.CloseOnClickOutside(event),
  );
}

DateSelectorComposer.prototype = Object.assign(
  DateSelectorComposer.prototype,
  Component.prototype,
  {
    setMonth(month) {
      this.month = month;
      this.mountMonthSelector();
      this.emit('month:change', month);
    },

    setYear(year) {
      this.year = year;
      this.mountYearSelector();
      this.emit('year:change', year);
    },
  },
);
