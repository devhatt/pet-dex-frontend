import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['item:change', 'item:click'];

const html = `
	<li class="selector-item" data-select="selector-item"></li>
`;

export default function SelectorItem(item) {
  Component.call(this, { html, events });
  this.item = item;
  this.$selectorItem = this.selected.get('selector-item');
  this.$selectorItem.innerText = this.item;

  if (typeof this.item === 'string') this.$selectorItem.style.width = '150px';

  if (typeof this.item === 'number') this.$selectorItem.style.width = '70px';

  this.emitClickEvent = () => {
    this.emit('item:click');
  };

  this.$selectorItem.addEventListener('click', this.emitClickEvent);
}

SelectorItem.prototype = Object.assign(
  SelectorItem.prototype,
  Component.prototype,
  {
    active() {
      this.$selectorItem.classList.add('selector-item--active');
      this.emit('item:change', this.item);
    },
  },
);
