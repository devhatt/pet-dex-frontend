import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import DayButton from './components/DayButton';

import './index.scss';

const events = ['day:change'];

const html = `
    <div class="day-composer" data-select="day-composer"></div>
`;

export default function DayComposer({ day, month, year }) {
  Component.call(this, { html, events });

  this.day = day;
  this.month = month;
  this.year = year;
  this.$dayComposer = this.selected.get('day-composer');
  this.activeDayButton = null;

  this.totalDaysInCalendar = 42;
  this.totalDaysInMonth = dayjs(`${this.year}-${this.month}-1`).daysInMonth();
  this.firstDayInWeek = dayjs(`${this.year}-${this.month}-1`).day();
  this.totalDaysInPreviousMonth = dayjs(
    `${this.year}-${this.month - 1}-1`,
  ).daysInMonth();
  this.nextMonthDay = 1;
  this.actualMonthDay = 1;

  for (let i = 1; i <= this.totalDaysInCalendar; i += 1) {
    if (i <= this.firstDayInWeek) {
      const previousMonthDay =
        this.totalDaysInPreviousMonth - this.firstDayInWeek + i;
      this.mountDay(previousMonthDay, 'previousMonth');
    } else if (this.actualMonthDay > this.totalDaysInMonth) {
      this.mountDay(this.nextMonthDay, 'nextMonth');
      this.nextMonthDay += 1;
    } else {
      this.mountDay(
        this.actualMonthDay,
        this.actualMonthDay === this.day && 'active',
      );
      this.actualMonthDay += 1;
    }
  }
}

DayComposer.prototype = Object.assign(
  DayComposer.prototype,
  Component.prototype,
  {
    mountDay(day, state) {
      const dayButton = new DayButton(day);

      if (state === 'active') this.activeDayButton = dayButton;

      dayButton.mount(this.$dayComposer);
      dayButton.setState(state);
      dayButton.listen('day:active', (activeDay) =>
        this.handleDayActive(dayButton, activeDay),
      );
    },

    handleDayActive(dayButton, activeDay) {
      if (this.activeDayButton) this.activeDayButton.desactive();

      this.activeDayButton = dayButton;
      this.emit('day:change', activeDay);
    },
  },
);
