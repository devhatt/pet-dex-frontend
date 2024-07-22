import { Component } from 'pet-dex-utilities';
import { MONTHS } from '../../utils/months';
import Sliding from '../../../Sliding/index';

import './index.scss';
import DayComposer from './components/DayComposer';

const events = ['day:change'];

const html = `
    <div class="calendar-sliding" data-select="calendar-sliding"></div>
`;

export default function CalendarSliding({ day, month, year }) {
  Component.call(this, { html, events });

  this.day = day;
  this.month = month;
  this.year = year;
  this.$calendarSliding = this.selected.get('calendar-sliding');
  this.sliding = new Sliding({ slides: [] });

  for (let i = 0; i < MONTHS.length; i += 1) {
    const $slide = document.createElement('div');
    const dayComposer = new DayComposer({
      day: this.day,
      month: i + 1,
      year: this.year,
    });
    dayComposer.mount($slide);
    dayComposer.listen('day:change', (newDay) =>
      this.emit('day:change', newDay),
    );
    this.sliding.add($slide);
  }

  this.sliding.mount(this.$calendarSliding);
}

CalendarSliding.prototype = Object.assign(
  CalendarSliding.prototype,
  Component.prototype,
  {
    next() {
      this.sliding.next();
    },

    previous() {
      this.sliding.previous();
    },
  },
);
