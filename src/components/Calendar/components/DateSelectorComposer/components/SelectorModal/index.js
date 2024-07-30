import { Component } from 'pet-dex-utilities';
import { MONTHS } from '../../../../utils/months';
import ModalItem from './components/ModalItem';

import './index.scss';

const events = ['month:change', 'year:change'];

const html = `
    <ul class="selector-modal" data-select="selector-modal"></ul>
`;

export default function SelectorModal(dateArray) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$selectorModal = this.selected.get('selector-modal');
  this.isYear = typeof dateArray[0] === 'number';
  this.itemsPerPage = 25;
  this.currentPage = 0;

  this.renderItens();

  this.$selectorModal.addEventListener('scroll', this.handleScroll.bind(this));

  setTimeout(() => {
    this.$selectorModal.scrollTop = this.$selectorModal.scrollHeight / 2.1121;
  }, 0);
}

SelectorModal.prototype = Object.assign(
  SelectorModal.prototype,
  Component.prototype,
  {
    renderItens() {
      const start = this.currentPage * this.itemsPerPage;
      const end = Math.min(start + this.itemsPerPage, this.dateArray.length);

      for (let i = start; i < end; i += 1) {
        const modalItem = new ModalItem(this.dateArray[i]);
        modalItem.mount(this.$selectorModal);
      }

      this.currentPage += 1;
      this.items = this.$selectorModal.children;
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = this.$selectorModal;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        this.currentPage * this.itemsPerPage < this.dateArray.length
      )
        this.renderItens();
    },

    changeMonth(month) {
      for (let i = 0; i < this.dateArray.length; i += 1) {
        const index = (month - (2 - i) + 12) % 12;
        this.dateArray[i] = MONTHS[index];
      }

      this.dateArray.forEach((item, index) => {
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
      for (let i = 0; i < this.dateArray.length; i += 1) {
        this.dateArray[i] = year - (2 - i);
      }

      this.dateArray.forEach((item, index) => {
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
