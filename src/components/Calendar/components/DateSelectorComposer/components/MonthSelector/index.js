import { Component } from 'pet-dex-utilities';
import './index.scss';
import SelectorItem from '../SelectorItem';

const events = [];

const html = `
    <div class="month-selector" data-select="month-selector">
        <ul class="month-selector__previous-months" data-select="previous-months"></ul>
        <span class="month-selector__current-month" data-select="current-month"></span>
        <ul class="month-selector__next-months" data-select="next-months"></ul>
    </div>
`;

export default function MonthSelector(monthArray) {
  Component.call(this, { html, events });

  this.monthArray = monthArray;
  this.$monthSelector = this.selected.get('month-selector');
  this.$previousMonths = this.selected.get('previous-months');
  this.$currentMonth = this.selected.get('current-month');
  this.$nextMonths = this.selected.get('next-months');

  for (let i = 0; i < monthArray.length; i += 1) {
    if (i < 3) {
      const selectorItem = new SelectorItem(this.monthArray[i]);
      selectorItem.mount(this.$previousMonths);
    }
    if (i === 3) {
      this.$currentMonth.innerText = this.monthArray[i];
    }
    if (i > 3) {
      const selectorItem = new SelectorItem(this.monthArray[i]);
      selectorItem.mount(this.$nextMonths);
    }
  }
}

MonthSelector.prototype = Object.assign(
  MonthSelector.prototype,
  Component.prototype,
  {},
);
