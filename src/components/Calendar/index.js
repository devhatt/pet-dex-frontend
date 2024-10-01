import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import WeekDayComposer from './components/WeekDayComposer';
import NavigationButton from './components/NavigationButton';
import DateSelectorComposer from './components/DateSelectorComposer';
import DayComposer from './components/DayComposer';

import './index.scss';

const events = [
  'date:change',
  'day:change',
  'month:change',
  'year:change',
  'month:next',
  'month:previous',
];

const html = `
  <div class="calendar" data-select="calendar">
    <div class="calendar__controls" data-select="calendar-controls"></div>
    <div class="calendar__content" data-select="calendar-content"></div>
  </div>
`;

export default function Calendar({
  day = dayjs().date(),
  month = dayjs().month() + 1,
  year = dayjs().year(),
}) {
  Component.call(this, { html, events });

  this.day = day;
  this.month = month;
  this.year = year;

  this.$calendar = this.selected.get('calendar');
  this.$calendarControls = this.selected.get('calendar-controls');
  this.$calendarContent = this.selected.get('calendar-content');

  this.previousButton = new NavigationButton('previous');
  this.previousButton.mount(this.$calendarControls);
  this.previousButton.listen('button:click', () => this.previousMonth());

  this.dateSelector = new DateSelectorComposer({
    month: this.month - 1,
    year: this.year,
  });
  this.dateSelector.mount(this.$calendarControls);
  this.dateSelector.listen('month:change', (newMonth) => {
    this.setMonth(newMonth + 1);
  });
  this.dateSelector.listen('year:change', (newYear) => this.setYear(newYear));

  this.nextButton = new NavigationButton('next');
  this.nextButton.mount(this.$calendarControls);
  this.nextButton.listen('button:click', () => this.nextMonth());

  this.weekDayComposer = new WeekDayComposer();
  this.weekDayComposer.mount(this.$calendarContent);

  this.mountDayComposer = () => {
    if (this.dayComposer) this.dayComposer.unmount();

    this.dayComposer = new DayComposer(this.getDate());
    this.dayComposer.mount(this.$calendarContent);
    this.dayComposer.listen('day:change', (newDay) => this.setDay(newDay));
    this.dayComposer.listen('day:previousMonth', () => this.previousMonth());
    this.dayComposer.listen('day:nextMonth', () => this.nextMonth());
  };

  this.setDate(this.day, this.month, this.year);
}

Calendar.prototype = Object.assign(Calendar.prototype, Component.prototype, {
  setDate(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.mountDayComposer();
    this.firstDayInWeek = dayjs(`${this.year}-${this.month}-${this.day}`).day();
    this.weekDayComposer.activeWeekDay(this.firstDayInWeek);

    this.emit('date:change', {
      day: this.day,
      month: this.month,
      year: this.year,
    });
  },

  setDay(day) {
    this.day = day;
    this.setDate(this.day, this.month, this.year);

    this.emit('day:change', this.day);
  },

  setMonth(month) {
    this.month = month;
    this.setDate(this.day, this.month, this.year);

    this.emit('month:change', this.month);
  },

  setYear(year) {
    this.year = year;
    this.setDate(this.day, this.month, this.year);

    this.emit('year:change', this.year);
  },

  getDate() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
    };
  },

  getDay() {
    return this.day;
  },

  getMonth() {
    return this.month;
  },

  getYear() {
    return this.year;
  },

  nextMonth(day) {
    this.day = day || this.day;
    this.month += 1;

    if (this.month > 12) {
      this.month = 1;
      this.year += 1;
      this.dateSelector.setYear(this.year);
    }

    const totalDaysInMonth = dayjs(
      `${this.year}-${this.month}-1`,
    ).daysInMonth();
    if (this.day > totalDaysInMonth) this.day = totalDaysInMonth;

    this.dateSelector.setMonth(this.month - 1);
    this.setDate(this.day, this.month, this.year);

    this.emit('month:next', this.month);
  },

  previousMonth(day) {
    this.day = day || this.day;
    this.month -= 1;

    if (this.month < 1) {
      this.month = 12;
      this.year -= 1;
      this.dateSelector.setYear(this.year);
    }

    const totalDaysInMonth = dayjs(
      `${this.year}-${this.month}-1`,
    ).daysInMonth();
    if (this.day > totalDaysInMonth) this.day = totalDaysInMonth;

    this.dateSelector.setMonth(this.month - 1);
    this.setDate(this.day, this.month, this.year);

    this.emit('month:previous', this.year);
  },
});
