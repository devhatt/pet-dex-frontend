import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import DayButton from './components/DayButton';
import './index.scss';

const events = ['day:change', 'day:nextMonth', 'day:previousMonth'];

const html = `
    <div class="day-composer" data-select="day-composer"></div>
`;

export default function DayComposer({
  day = dayjs().date(),
  month = dayjs().month() + 1,
  year = dayjs().year(),
}) {
  Component.call(this, { html, events });

  this.day = day;
  this.month = month;
  this.year = year;
  this.$dayComposer = this.selected.get('day-composer');
  this.activeDayButton = null;

  const currentDay = dayjs().date();
  const actualMonth = dayjs().month() + 1;
  const actualYear = dayjs().year();

  const totalDaysInCalendar = 42;
  this.totalDaysInMonth = dayjs(`${this.year}-${this.month}-1`).daysInMonth();
  this.firstDayInWeek = dayjs(`${this.year}-${this.month}-1`).day();
  this.totalDaysInPreviousMonth = dayjs(
    `${this.year}-${this.month - 1}-1`,
  ).daysInMonth();
  this.nextMonthDay = 1;
  this.actualMonthDay = 1;

  for (let i = 1; i <= totalDaysInCalendar; i += 1) {
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

      if (
        this.actualMonthDay === currentDay &&
        this.month === actualMonth &&
        this.year === actualYear
      )
        this.dayButton.currentDay();

      this.actualMonthDay += 1;
    }
  }
}

DayComposer.prototype = Object.assign(
  DayComposer.prototype,
  Component.prototype,
  {
    mountDay(day, state) {
      this.dayButton = new DayButton(day, state);

      if (state === 'active') this.activeDayButton = this.dayButton;

      this.dayButton.mount(this.$dayComposer);
      this.dayButton.listen('day:active', (activeDay) =>
        this.handleDayActive(this.dayButton, activeDay),
      );
      this.dayButton.listen('day:previousMonth', () =>
        this.emit('day:previousMonth'),
      );
      this.dayButton.listen('day:nextMonth', () => this.emit('day:nextMonth'));
    },

    handleDayActive(dayButton, activeDay) {
      if (this.activeDayButton) this.activeDayButton.desactive();

      this.activeDayButton = dayButton;
      this.emit('day:change', activeDay);
    },
  },
);
