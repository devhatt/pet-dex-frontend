import { Component } from 'pet-dex-utilities';
import WeekDay from './components/WeekDay';
import { WEEK_DAYS } from './utils/weekDays';

import './index.scss';

const events = [];

const html = `
    <div class="week-days" data-select="week-days"></div>
`;

export default function WeekDayComposer() {
  Component.call(this, { html, events });

  this.$weekDays = this.selected.get('week-days');
  this.totalWeekDays = 7;

  for (let i = 0; i < this.totalWeekDays; i += 1) {
    const weekDay = new WeekDay(WEEK_DAYS[i]);
    weekDay.mount(this.$weekDays);
  }
}

WeekDayComposer.prototype = Object.assign(
  WeekDayComposer.prototype,
  Component.prototype,
  {
    activeWeekDay(currentWeekDay) {
      Array.from(this.$weekDays.children).forEach((weekDay, index) => {
        weekDay.classList.toggle(
          'week-days__day--active',
          index === currentWeekDay,
        );
      });
    },
  },
);
