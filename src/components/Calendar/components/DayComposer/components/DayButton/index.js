import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['day:active', 'day:previousMonth', 'day:nextMonth'];

const html = `
    <li class="day" data-select="day">
        <button class="day__button" data-select="day-button"></button>
    </li>

`;

export default function DayButton(day, state) {
  Component.call(this, { html, events });

  this.day = day;
  this.$day = this.selected.get('day');
  this.$dayButton = this.selected.get('day-button');
  this.setState(state);

  this.$dayButton.innerText = day;
  this.$dayButton.setAttribute('aria-label', `Dia ${this.day}`);

  const emitClickevent = () => {
    if (this.state === 'previousMonth') {
      this.emit('day:previousMonth');
    }

    if (this.state === 'nextMonth') {
      this.emit('day:nextMonth');
    }

    this.active();
  };

  this.$day.addEventListener('click', () => emitClickevent());
}

DayButton.prototype = Object.assign(DayButton.prototype, Component.prototype, {
  setState(state) {
    this.state = state;
    this.$dayButton.classList.add(`day__button--${state}`);
  },

  active() {
    this.$dayButton.classList.add('day__button--active');
    this.emit('day:active', this.day);
  },

  desactive() {
    this.$dayButton.classList.remove('day__button--active');
  },

  actualDay() {
    this.$dayButton.classList.add('day__button--actual');
  },
});
