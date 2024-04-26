import { Component } from 'pet-dex-utilities';
import './index.scss';
import dayjs from 'dayjs';
import DateSelector from './components/DateSelector';
import NavButton from './components/NavButton';
import Days from './components/Days';

const events = ['changeDate', 'changeMonth', 'changeYear'];

const monthsBR = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const currentMonth = dayjs().month();
const months = new Array(5);
for (let i = 0; i < months.length; i += 1) {
  const monthIndex = (currentMonth - (2 - i) + 12) % 12;
  months[i] = monthsBR[monthIndex];
}

const currentYear = dayjs().year();
const years = new Array(5);
for (let i = 0; i < years.length; i += 1) {
  years[i] = currentYear - (2 - i);
}

const html = `
  <article class="calendar-container" data-select="calendar-container">
    <nav data-select="calendar-nav" class="calendar-container__date">
      <div data-select="calendar-date" class="calendar-container__date-select"></div>
    </nav>
    <section class="calendar-container__days" data-select="calendar-days">
      <div>
        <p>Dom</p>
        <p>Seg</p>
        <p>Ter</p>
        <p>Qua</p>
        <p>Qui</p>
        <p>Sex</p>
        <p>Sab</p>
      </div>
    </section
  </article>
`;

export default function Calendar() {
  Component.call(this, { html, events });

  this.setDate();

  this.monthSelect = new DateSelector(months);
  this.monthSelect.mount(this.selected.get('calendar-date'));
  this.monthSelect.listen('changeMonth', (newMonth) =>
    this.setDate(this.day, newMonth, this.year),
  );

  this.yearSelect = new DateSelector(years);
  this.yearSelect.mount(this.selected.get('calendar-date'));
  this.yearSelect.listen('changeYear', (newYear) =>
    this.setDate(this.day, this.month, newYear),
  );

  this.navButton = new NavButton('prev');
  this.navButton.mount(this.selected.get('calendar-nav'));
  this.navButton.listen('prev', () => this.goToPrevMonth());

  this.navButton = new NavButton('next');
  this.navButton.mount(this.selected.get('calendar-nav'));
  this.navButton.listen('next', () => this.goToNextMonth());
}

Calendar.prototype = Object.assign(Calendar.prototype, Component.prototype, {
  getDate() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
    };
  },

  setDate(day, month, year) {
    this.day = day || dayjs().date();
    this.month = month !== undefined ? month : dayjs().month();
    this.year = year || dayjs().year();
    this.totalDaysOfMonth = dayjs(
      `${this.year}-${this.month + 1}`,
    ).daysInMonth();
    this.firstDayOfMonthInWeek =
      dayjs(`${this.year}-${this.month + 1}-1`).day() - 1;

    this.setDays();

    this.emit('changeDate', {
      day: this.day,
      month: this.month,
      year: this.year,
    });
  },

  getDay() {
    return this.day;
  },

  setDay(day) {
    if (day < 1 || day > this.totalDaysOfMonth) {
      throw new Error('Dia inválido');
    } else if (typeof day !== 'number') {
      throw new Error('O valor não é um number');
    } else {
      this.setDate(day, this.month, this.year);
    }
  },

  setDays() {
    if (this.days) this.days.unmount();
    this.days = new Days(
      this.year,
      this.month,
      this.day,
      this.totalDaysOfMonth,
      this.firstDayOfMonthInWeek,
    );
    this.days.mount(this.selected.get('calendar-days'));

    this.days.listen('changeDay', (newDay) => {
      this.setDate(newDay, this.month, this.year);
    });

    this.days.listen('changeToPrevMonth', (newDay) => {
      this.goToPrevMonth();
      this.setDay(newDay);
    });

    this.days.listen('changeToNextMonth', (newDay) => {
      this.goToNextMonth();
      this.setDay(newDay);
    });
  },

  getMonth() {
    return this.month;
  },

  setMonth(month) {
    if (month < 0 || month > 11) {
      throw new Error('Mês inválido');
    } else if (typeof month !== 'number') {
      throw new Error('O valor não é um number');
    } else {
      this.setDate(this.day, month, this.year);
    }
  },

  getYear() {
    return this.year;
  },

  setYear(year) {
    if (year < 0) {
      throw new Error('Ano inválido');
    } else if (typeof year !== 'number') {
      throw new Error('O valor não é um number');
    } else {
      this.setDate(this.day, this.month, year);
    }
  },

  goToPrevMonth() {
    this.month -= 1;
    if (this.month < 0) {
      this.month = 11;
      this.year -= 1;
      this.yearSelect.setYear(this.year);
    }
    this.monthSelect.setMonth(this.month);
    this.setDate(this.day, this.month, this.year);
  },

  goToNextMonth() {
    this.month += 1;
    if (this.month > 11) {
      this.month = 0;
      this.year += 1;
      this.yearSelect.setYear(this.year);
    }
    this.monthSelect.setMonth(this.month);
    this.setDate(this.day, this.month, this.year);
  },
});
