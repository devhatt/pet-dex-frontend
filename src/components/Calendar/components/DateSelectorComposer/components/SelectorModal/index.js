import { Component } from 'pet-dex-utilities';
import './index.scss';
import ModalItem from './components/ModalItem';

const events = [];

const html = `
    <ul class="selector-modal" data-select="selector-modal"></ul>
`;

export default function SelectorModal(dateArray) {
  Component.call(this, { html, events });

  this.dateArray = dateArray.slice(1, -1);
  this.selectorModal = this.selected.get('selector-modal');

  for (let i = 0; i < this.dateArray.length; i += 1) {
    const modalItem = new ModalItem(this.dateArray[i]);
    modalItem.mount(this.selectorModal);
  }
}

SelectorModal.prototype = Object.assign(
  SelectorModal.prototype,
  Component.prototype,
  {},
);
