import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import WeekDayComposer from './components/WeekDayComposer';
import NavigationButton from './components/NavigationButton';
import CalendarSliding from './components/CalendarSliding';

import './index.scss';
import DateSelectorComposer from './components/DateSelectorComposer';

const events = [];

const html = `
  <div class="calendar" data-select="calendar">
    <div class="calendar__controls" data-select="calendar-controls"></div>
    <div class="calendar__content" data-select="calendar-content"></div>
  </div>
`;

export default function Calendar({ day, month, year }) {
  Component.call(this, { html, events });

  this.day = day || dayjs().date();
  this.month = month || dayjs().month() + 1;
  this.year = year || dayjs().year();

  this.$calendar = this.selected.get('calendar');
  this.$calendarControls = this.selected.get('calendar-controls');
  this.$calendarContent = this.selected.get('calendar-content');

  this.previousButton = new NavigationButton('previous');
  this.previousButton.mount(this.$calendarControls);
  this.previousButton.listen('button:click', () => this.previousMonth());

  this.dateSelector = new DateSelectorComposer(this.month, this.year);
  this.dateSelector.mount(this.$calendarControls);

  this.nextButton = new NavigationButton('next');
  this.nextButton.mount(this.$calendarControls);
  this.nextButton.listen('button:click', () => this.nextMonth());

  this.weekDayComposer = new WeekDayComposer();
  this.weekDayComposer.mount(this.$calendarContent);

  this.mountCalendarSliding = () => {
    if (this.calendarSliding) this.calendarSliding.unmount();

    this.calendarSliding = new CalendarSliding(this.getDate());
    this.calendarSliding.mount(this.$calendarContent);
    this.calendarSliding.listen('day:change', (newDay) => this.setDay(newDay));
  };

  this.mountCalendarSliding();
  this.setDate(this.day, this.month, this.year);
}

Calendar.prototype = Object.assign(Calendar.prototype, Component.prototype, {
  setDate(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.firstDayInWeek = dayjs(`${this.year}-${this.month}-${this.day}`).day();
    this.weekDayComposer.activeWeekDay(this.firstDayInWeek);
  },

  getDate() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
    };
  },

  setDay(day) {
    this.day = day;
    this.setDate(this.day, this.month, this.year);
  },

  getDay() {
    return this.day;
  },

  nextMonth(day) {
    this.day = day || this.day;
    this.month += 1;

    if (this.month > 12) {
      this.month = 1;
      this.year += 1;
      this.mountCalendarSliding();
    } else {
      this.calendarSliding.next();
    }

    const totalDaysInMonth = dayjs(
      `${this.year}-${this.month}-1`,
    ).daysInMonth();
    if (this.day > totalDaysInMonth) this.day = totalDaysInMonth;

    this.setDate(this.day, this.month, this.year);
  },

  previousMonth(day) {
    this.day = day || this.day;
    this.month -= 1;

    if (this.month < 1) {
      this.month = 12;
      this.year -= 1;
      this.mountCalendarSliding();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
      this.calendarSliding.next();
    } else {
      this.calendarSliding.previous();
    }

    const totalDaysInMonth = dayjs(
      `${this.year}-${this.month}-1`,
    ).daysInMonth();
    if (this.day > totalDaysInMonth) this.day = totalDaysInMonth;

    this.setDate(this.day, this.month, this.year);
  },
});
