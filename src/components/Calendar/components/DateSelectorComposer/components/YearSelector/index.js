import { Component } from 'pet-dex-utilities';
import './index.scss';
import SelectorItem from '../SelectorItem';

const events = ['selector:click'];

const html = `
     <div class="year-selector" data-select="year-selector">
        <ul class="year-selector__previous-years" data-select="previous-years"></ul>
        <span class="year-selector__current-year" data-select="current-year"></span>
        <ul class="year-selector__next-years" data-select="next-years"></ul>
    </div>
`;

export default function YearSelector(yearArray) {
  Component.call(this, { html, events });

  this.yearArray = yearArray;
  this.$monthSelector = this.selected.get('year-selector');
  this.$previousYears = this.selected.get('previous-years');
  this.$currentYear = this.selected.get('current-year');
  this.$nextYears = this.selected.get('next-years');

  for (let i = 0; i < this.yearArray.length; i += 1) {
    if (i < 3) {
      const selectorItem = new SelectorItem(this.yearArray[i]);
      selectorItem.mount(this.$previousYears);
    }
    if (i === 3) {
      this.$currentYear.innerText = this.yearArray[i];
    }
    if (i > 3) {
      const selectorItem = new SelectorItem(this.yearArray[i]);
      selectorItem.mount(this.$nextYears);
    }
  }
}

YearSelector.prototype = Object.assign(
  YearSelector.prototype,
  Component.prototype,
  {},
);
