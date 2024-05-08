import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['changeDay'];

const html = `
  <button data-select="day-button" class="day__button" type="button" aria-label="Dia do mês"></button>
`;

export default function Day(day, dayClass) {
  Component.call(this, { html, events });

  this.$day = this.selected.get('day-button');
  this.$day.innerText = day;
  this.$day.setAttribute('aria-label', `Dia ${day}`);
  if (dayClass) this.setClass(dayClass);

  const setActiveDayHandle = (event) => this.setClassActive(event);
  this.$day.addEventListener('click', setActiveDayHandle);

  this.unmount(() => {
    this.$day.removeEventListener('click', setActiveDayHandle);
  });
}

Day.prototype = Object.assign(Day.prototype, Component.prototype, {
  setClass(dayClass) {
    this.$day.classList.add(dayClass);
  },

  setClassPrevMonth() {
    this.$day.classList.add('prev-month');
  },

  setClassActive() {
    this.$day.classList.add('active');
    this.emit('changeDay', this.$day);
  },

  setClassNextMonth() {
    this.$day.classList.add('next-month');
  },
});
