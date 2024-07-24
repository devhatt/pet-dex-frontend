import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
    <span class="week-days__day" data-select="week-day"></span>
`;

export default function WeekDay(weekDay) {
  Component.call(this, { events, html });

  this.weekDay = weekDay;
  this.$weekDay = this.selected.get('week-day');
  this.$weekDay.innerText = weekDay.abbreviation;
  this.$weekDay.setAttribute('aria-label', `${weekDay.name}`);
}

WeekDay.prototype = Object.assign(WeekDay.prototype, Component.prototype, {});
