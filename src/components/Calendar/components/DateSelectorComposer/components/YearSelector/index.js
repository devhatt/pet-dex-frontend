import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
    <div class="year-selector" data-select="year-selector"></div>
`;

export default function YearSelector(year) {
  Component.call(this, { html, events });

  this.year = year;
  this.$yearSelector = this.selected.get('year-selector');
  this.setYear(year);
}

YearSelector.prototype = Object.assign(
  YearSelector.prototype,
  Component.prototype,
  {
    setYear(year) {
      this.year = year;
      this.$yearSelector.innerText = this.year;
    },
  },
);
