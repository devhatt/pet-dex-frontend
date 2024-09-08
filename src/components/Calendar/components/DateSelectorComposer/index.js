import { Component } from 'pet-dex-utilities';
import { listenBreakpoint } from '../../../../utils/breakpoints/breakpoints';
import { ModalController } from './utils/ModalController';
import {
  yearArrayGenerator,
  monthArrayGenerator,
} from './utils/arraysGenerators';
import YearSelector from './components/YearSelector';
import DateSelected from './components/DateSelected';
import { MONTHS } from '../../utils/months';
import MonthSelector from './components/MonthSelector';

import './index.scss';

const events = ['month:change', 'year:change'];

const html = `
      <div class="date-selector-composer" data-select="date-selector-composer">
        <div class=date-selector-composer__year" data-select="year-selector"></div>
        <div class="date-selector-composer__month" data-select="month-selector"></div>
      </div>
`;

export default function DateSelectorComposer(month, year) {
  Component.call(this, { html, events });

  this.month = month;
  this.year = year;
  this.$dateSelector = this.selected.get('date-selector-composer');
  this.$monthSelector = this.selected.get('month-selector');
  this.$yearSelector = this.selected.get('year-selector');
  this.modalControl = new ModalController(this);

  const mountMobileSelectors = () => {
    if (this.monthSelector) this.monthSelector.unmount();
    if (this.yearSelector) this.yearSelector.unmount();

    this.monthArray = monthArrayGenerator(this.month);
    this.yearArray = yearArrayGenerator(this.year);

    this.monthSelector = new MonthSelector(this.monthArray);
    this.monthSelector.mount(this.$monthSelector);
    this.monthSelector.listen('month:change', (newMonth) =>
      this.setMonth(newMonth),
    );

    this.yearSelector = new YearSelector(this.yearArray);
    this.yearSelector.mount(this.$yearSelector);
    this.yearSelector.listen('year:change', (newYear) => this.setYear(newYear));
  };

  const mountDesktopSelectors = () => {
    if (this.monthSelected) this.monthSelected.unmount();
    if (this.yearSelected) this.yearSelected.unmount();

    this.monthArray = monthArrayGenerator(this.month);
    this.yearArray = yearArrayGenerator(this.year);

    this.monthSelected = new DateSelected(MONTHS[this.month]);
    this.monthSelected.mount(this.$monthSelector);
    this.monthSelected.listen('item:click', () =>
      this.modalControl.Open(this.monthArray),
    );

    this.yearSelected = new DateSelected(this.year);
    this.yearSelected.mount(this.$yearSelector);
    this.yearSelected.listen('item:click', () =>
      this.modalControl.Open(this.yearArray),
    );
  };

  listenBreakpoint('from667', (matches) => {
    if (matches) {
      if (this.monthSelector) this.monthSelector.unmount();
      if (this.yearSelector) this.yearSelector.unmount();

      mountDesktopSelectors();
    } else {
      if (this.monthSelected) this.monthSelected.unmount();
      if (this.yearSelected) this.yearSelected.unmount();

      mountMobileSelectors();
    }
  });

  window.addEventListener('click', (event) =>
    this.modalControl.CloseOnClickOutside(event),
  );
}

DateSelectorComposer.prototype = Object.assign(
  DateSelectorComposer.prototype,
  Component.prototype,
  {
    setMonth(month) {
      if (this.monthSelected) this.monthSelected.setDate(MONTHS[month]);

      this.month = month;
      this.emit('month:change', month);
    },

    setYear(year) {
      if (this.yearSelected) this.yearSelected.setDate(year);

      this.year = year;
      this.emit('year:change', year);
    },
  },
);
