import { Component } from 'pet-dex-utilities';
import Day from '../Day';

const events = ['changeDay', 'changeToPrevMonth', 'changeToNextMonth'];

const html = `
  <div data-select="days-container" class="days-container"></div>
`;

function changeDay(days, newDayActive) {
  const day = +newDayActive.innerText;
  const isDayInPrevMonth = newDayActive.classList.contains('prev-month');
  const isDayInNextMonth = newDayActive.classList.contains('next-month');

  if (isDayInPrevMonth) days.emit('changeToPrevMonth', day);
  else if (isDayInNextMonth) days.emit('changeToNextMonth', day);
  else days.emit('changeDay', day);
}

export default function Days(
  year,
  month,
  day,
  totalDaysOfMonth,
  firstDayOfMonthInWeek,
) {
  Component.call(this, { html, events });

  const $container = this.selected.get('days-container');

  const totalDaysInCalendar = 42;
  for (
    let i = -firstDayOfMonthInWeek;
    i < totalDaysInCalendar - firstDayOfMonthInWeek;
    i += 1
  ) {
    const date = new Date(year, month, i);
    const dayNumber = date.getDate();
    const firstDayOfMonth = 1;

    const dayButton = new Day(dayNumber);

    if (i < firstDayOfMonth) dayButton.setClassPrevMonth();
    if (i > totalDaysOfMonth) dayButton.setClassNextMonth();
    if (i === day) dayButton.setClassActive();

    dayButton.mount($container);
    dayButton.listen('changeDay', (newDayActive) =>
      changeDay(this, newDayActive),
    );
  }
}

Days.prototype = Object.assign(Days.prototype, Component.prototype, {});
