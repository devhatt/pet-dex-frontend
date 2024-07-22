import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
	<li class="selector-item" data-select="selector-item"></li>
`;

export default function SelectorItem(item) {
  Component.call(this, { html, events });
  this.item = item;
  this.$selectorItem = this.selected.get('selector-item');
  this.$selectorItem.innerText = this.item;
}

SelectorItem.prototype = Object.assign(
  SelectorItem.prototype,
  Component.prototype,
  {
    active() {
      this.$selectorItem.classList.add('selector-item--active');
    },
  },
);
