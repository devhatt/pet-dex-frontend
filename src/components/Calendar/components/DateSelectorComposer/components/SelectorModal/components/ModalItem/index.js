import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['item:change', 'item:click'];

const html = `
    <li class="selector-modal__item" data-select="modal-item"></li>
`;

export default function ModalItem(item) {
  Component.call(this, { html, events });

  this.item = item;
  this.$modalItem = this.selected.get('modal-item');
  this.$modalItem.innerText = this.item;

  const emitEventClick = () => {
    this.emit('item:click', this.item);
  };

  this.$modalItem.addEventListener('click', () => emitEventClick());
}

ModalItem.prototype = Object.assign(ModalItem.prototype, Component.prototype, {
  active() {
    this.$modalItem.classList.add('selector-modal__item--active');
    this.emit('item:change', this.item);
  },
});
