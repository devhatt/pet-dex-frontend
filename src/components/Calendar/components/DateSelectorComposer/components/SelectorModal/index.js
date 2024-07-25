import { Component } from 'pet-dex-utilities';
import './index.scss';
import { MONTHS } from '../../../../utils/months';
import ModalItem from './components/ModalItem';

const events = ['month:change', 'year:change'];

const html = `
    <ul class="selector-modal" data-select="selector-modal"></ul>
`;

export default function SelectorModal(monthArray, yearArray) {
  Component.call(this, { html, events });

  this.monthArray = monthArray.slice(1, -1);
  this.yearArray = yearArray.slice(1, -1);
  this.selectorModal = this.selected.get('selector-modal');

  for (let i = 0; i < this.monthArray.length; i += 1) {
    const modalItem = new ModalItem(
      `${this.monthArray[i]} ${this.yearArray[i]}`,
    );
    modalItem.mount(this.selectorModal);
    if (i === 2) modalItem.active();
  }

  this.items = this.selectorModal.children;
}

SelectorModal.prototype = Object.assign(
  SelectorModal.prototype,
  Component.prototype,
  {
    changeMonth(month) {
      for (let i = 0; i < this.monthArray.length; i += 1) {
        const index = (month - (2 - i) + 12) % 12;
        this.monthArray[i] = MONTHS[index];
      }

      this.monthArray.forEach((item, index) => {
        this.items[index].innerText = item;
      });

      this.items[2].scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });

      this.emit('month:change', month);
    },

    changeYear(year) {
      for (let i = 0; i < this.yearArray.length; i += 1) {
        this.dateArray[i] = year - (2 - i);
      }

      this.yearArray.forEach((item, index) => {
        this.items[index].innerText = item;
      });

      this.items[2].scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });

      this.emit('year:change', year);
    },
  },
);
