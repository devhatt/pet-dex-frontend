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

  this.mountSelectors = () => {
    if (this.yearSelector) this.yearSelector.unmount();
    if (this.yearSelected) this.yearSelected.unmount();
    if (this.monthSelector) this.monthSelector.unmount();
    if (this.monthSelected) this.monthSelected.unmount();

    this.yearArray = yearArrayGenerator(this.year);
    this.monthArray = monthArrayGenerator(this.month);

    this.yearSelector = new YearSelector(this.yearArray, 75);
    this.yearSelector.listen('year:change', (newYear) =>
      this.emit('year:change', newYear),
    );

    this.yearSelected = new DateSelected(this.year);
    this.yearSelected.listen('item:click', () =>
      this.modalControl.Open(this.yearArray),
    );

    this.monthSelector = new MonthSelector(this.monthArray, 120);
    this.monthSelector.listen('month:change', (newMonth) =>
      this.emit('month:change', newMonth),
    );

    this.monthSelected = new DateSelected(MONTHS[this.month]);
    this.monthSelected.listen('item:click', () =>
      this.modalControl.Open(this.monthArray),
    );

    listenBreakpoint('from667', (matches) => {
      if (matches) {
        this.monthSelector.unmount();
        this.yearSelector.unmount();

        this.monthSelected.mount(this.$monthSelector);
        this.yearSelected.mount(this.$yearSelector);
      } else {
        this.yearSelected.unmount();
        this.monthSelected.unmount();

        this.yearSelector.mount(this.$yearSelector);
        this.monthSelector.mount(this.$monthSelector);
      }
    });
  };

  this.mountSelectors();

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
      this.mountSelectors();
      this.emit('month:change', month);
    },

    setYear(year) {
      this.year = year;
      this.mountSelectors();
      this.emit('year:change', year);
    },
  },
);
