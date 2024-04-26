import { Component } from 'pet-dex-utilities';
import './index.scss';
import { listenBreakpoint } from '../../../../utils/breakpoints/breakpoints';
import DateButton from '../DateButton';

const events = ['changeMonth', 'changeYear'];

const html = `
  <ul data-select="date-selector" class="date-selector"></ul>
`;

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

let handleTouchStart;
let handleTouchMove;
function addTouchEvents(selector) {
  let startTouch;

  handleTouchStart = (event) => {
    startTouch = selector.isDesktop
      ? event.touches[0].clientY
      : event.touches[0].clientX;
  };

  handleTouchMove = (event) => {
    event.preventDefault();
    const currentTouch = selector.isDesktop
      ? event.touches[0].clientY
      : event.touches[0].clientX;
    let move = 0;
    const moveRange = 20;
    move = currentTouch - startTouch;

    if (Math.abs(move) > moveRange) {
      const isSlideNext = move < 0;
      const nextYear = +selector.dates[3].children[0].innerText;
      const prevYear = +selector.dates[1].children[0].innerText;
      const nextMonth = monthsBR.indexOf(
        selector.dates[3].children[0].innerText,
      );
      const prevMonth = monthsBR.indexOf(
        selector.dates[1].children[0].innerText,
      );
      if (isSlideNext && selector.isYear) selector.setYear(nextYear);
      if (!isSlideNext && selector.isYear) selector.setYear(prevYear);
      if (isSlideNext && !selector.isYear) selector.setMonth(nextMonth);
      if (!isSlideNext && !selector.isYear) selector.setMonth(prevMonth);
      startTouch = currentTouch;
    }
  };
  selector.dateSelector.addEventListener('touchstart', handleTouchStart);
  selector.dateSelector.addEventListener('touchmove', handleTouchMove);
}

let handleScroll;
function scrollModal(selector) {
  const $dateSelector = selector.dateSelector;

  handleScroll = (event) => {
    event.preventDefault();
    const isScrollNext = event.deltaY > 0;

    if (selector.isYear) {
      const nextYear = +selector.dates[3].children[0].innerText;
      const prevYear = +selector.dates[1].children[0].innerText;
      const newYear = isScrollNext ? nextYear : prevYear;
      selector.setYear(newYear);
    } else {
      const nextMonth = monthsBR.indexOf(
        selector.dates[3].children[0].innerText,
      );
      const prevMonth = monthsBR.indexOf(
        selector.dates[1].children[0].innerText,
      );
      const newMonth = isScrollNext ? nextMonth : prevMonth;
      selector.setMonth(newMonth);
    }
  };

  $dateSelector.addEventListener('wheel', handleScroll);
  addTouchEvents(selector);
}

function openModal(selector) {
  const $dateSelector = selector.dateSelector;
  $dateSelector.classList.add('active');
  const $activeDate = selector.date;
  $activeDate.scrollIntoView({
    behavior: 'instant',
    block: 'center',
    inline: 'center',
  });
}

function closeModal(selector, event) {
  const $dateSelector = selector.dateSelector;
  if (
    $dateSelector.classList.contains('active') &&
    !$dateSelector.contains(event.target)
  ) {
    $dateSelector.classList.remove('active');
  }
}

export default function DateSelector(dateArray) {
  Component.call(this, { html, events });

  this.dateSelector = this.selected.get('date-selector');
  this.dateArray = dateArray;

  this.dateArray.forEach((item, index) => {
    const dateButton = new DateButton(item);
    dateButton.mount(this.dateSelector);
    if (index === 2) {
      dateButton.active();
    }
  });

  this.dates = this.dateSelector.querySelectorAll('li');
  this.date = this.dateSelector.querySelector('li.active');
  this.isYear = !Number.isNaN(+this.date.innerText);
  listenBreakpoint('from667', (matches) => {
    this.isDesktop = matches;
  });

  this.dateClickHandle = (index) => () => {
    if (this.isYear) {
      this.setYear(this.dateArray[index]);
    } else {
      this.setMonth(monthsBR.indexOf(this.dateArray[index]));
    }
  };

  this.dates.forEach(($date, index) => {
    $date.addEventListener('click', this.dateClickHandle(index));
  });
  this.openModalHandle = () => openModal(this);
  this.dateSelector.addEventListener('click', this.openModalHandle);

  this.closeModalHandle = (event) => closeModal(this, event);
  window.addEventListener('click', this.closeModalHandle);

  scrollModal(this);

  setTimeout(() => {
    this.date.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  });

  this.unmount(() => {
    this.dateSelector.removeEventListener('click', this.openModalHandle);
    window.removeEventListener('click', this.closeModalHandle);
    this.dates.forEach(($date, index) => {
      $date.removeEventListener('click', this.dateClickHandle(index));
    });
    this.dateSelector.removeEventListener('wheel', handleScroll);
    this.dateSelector.removeEventListener('touchstart', handleTouchStart);
    this.dateSelector.removeEventListener('touchmove', handleTouchMove);
  });
}

DateSelector.prototype = Object.assign(
  DateSelector.prototype,
  Component.prototype,
  {
    setMonth(newMonth) {
      for (let i = 0; i < this.dateArray.length; i += 1) {
        const index = (newMonth - (2 - i) + 12) % 12;
        this.dateArray[i] = monthsBR[index];
      }

      this.dateArray.forEach((item, index) => {
        this.dates[index].children[0].innerText = item;
      });

      this.date.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });

      this.emit('changeMonth', newMonth);
    },

    setYear(newYear) {
      for (let i = 0; i < this.dateArray.length; i += 1) {
        this.dateArray[i] = newYear - (2 - i);
      }

      this.dateArray.forEach((item, index) => {
        this.dates[index].children[0].innerText = item;
      });

      this.date.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });

      this.emit('changeYear', newYear);
    },
  },
);
