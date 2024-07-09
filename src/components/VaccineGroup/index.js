import { Component } from 'pet-dex-utilities';
import VaccineItem from '../VaccineItem';
import './index.scss';

const events = ['item:change', 'title:change'];

const html = `
  <div class="vaccine-group" data-select="group">
      <p class="vaccine-group__vaccine-title" data-select="title"> </p>
  </div>
`;

export default function VaccineGroup({ year, vaccine } = {}) {
  Component.call(this, { html, events });

  this.items = new Map();
  if (year) this.setTitle(year);
  if (vaccine) this.setItem(vaccine);
}

VaccineGroup.prototype = Object.assign(
  VaccineGroup.prototype,
  Component.prototype,
  {
    getTitle() {
      return this.selected.get('title').textContent;
    },
    getItem(itemId) {
      return this.items.get(itemId);
    },
    setTitle(year) {
      this.selected.get('title').textContent = year;
      this.emit('title:change', year);
    },
    setItem(item) {
      const $vaccineGroup = this.selected.get('group');
      const vaccineItem = new VaccineItem(item);

      vaccineItem.mount($vaccineGroup);
      this.items.set(item.id, vaccineItem);
      this.emit('item:change', vaccineItem);
    },
    listItems() {
      const items = [];

      Array.from(this.items.values()).forEach((item) => {
        items.push({
          id: item.id,
          title: item.getTitle(),
          veterinary: item.getVeterinary(),
          date: item.getDate(),
        });
      });

      return items;
    },
  },
);
