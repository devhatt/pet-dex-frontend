import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
    <li class="selector-modal__item" data-select="modal-item"></li>
`;

export default function ModalItem(item) {
  Component.call(this, { html, events });

  this.item = item;
  this.$modalItem = this.selected.get('modal-item');
  this.$modalItem.innerText = this.item;
}

ModalItem.prototype = Object.assign(
  ModalItem.prototype,
  Component.prototype,
  {},
);
