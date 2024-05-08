import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import calendarUrl from './images/calendar.svg';
import './index.scss';

const events = ['date:change', 'title:change', 'vet:change', 'id:change'];

const html = `
  <div class="vaccine-item">
    <p class="vaccine-item__title" data-select="title"></p>
    <div class="vaccine-item__date">
      <hr class="vaccine-item__divider"></hr>
      <img src=${calendarUrl} alt="calendar">
      <p data-select="date"></p>
      <hr class="vaccine-item__divider"></hr>
    </div>
    <p class="vaccine-item__vet" data-select="veterinary"></p>
  </div>
`;

function formatDate(date) {
  return date ? dayjs(date).format('MM/DD/YYYY') : '';
}

export default function VaccineItem({
  id = '',
  title = '',
  veterinary = '',
  date = '',
} = {}) {
  Component.call(this, { html, events });

  this.setId(id);
  this.setTitle(title);
  this.setVeterinary(veterinary);
  this.setDate(date);
}

VaccineItem.prototype = Object.assign(
  VaccineItem.prototype,
  Component.prototype,
  {
    getId() {
      return this.id;
    },
    getTitle() {
      return this.selected.get('title').textContent;
    },
    getVeterinary() {
      return this.selected.get('veterinary').textContent;
    },
    getDate() {
      return this.selected.get('date').textContent;
    },
    setId(id) {
      this.id = id;
      this.emit('id:change', id);
    },
    setTitle(title) {
      this.selected.get('title').textContent = title;
      this.emit('title:change', title);
    },
    setVeterinary(veterinary) {
      this.selected.get('veterinary').textContent = veterinary;
      this.emit('vet:change', veterinary);
    },
    setDate(date) {
      const dateFormatted = formatDate(date);
      this.selected.get('date').textContent = dateFormatted;
      this.emit('date:change', date);
    },
  },
);
