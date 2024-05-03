import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import calendarUrl from './images/calendar.svg';
import './index.scss';

const events = ['date:change', 'title:change', 'vet:change', 'id:change'];

const html = `
  <div class="vaccine-item">
    <p class="vaccine-item__info-body title" data-select="body-title"></p>
    <div class="vaccine-item__info-body date">
      <hr class="vaccine-item__info-body divider"></hr>
      <img src=${calendarUrl} alt="calendar">
      <p data-select="body-date"></p>
      <hr class="vaccine-item__info-body divider"></hr>
    </div>
    <p class="vaccine-item__info-body vet" data-select="body-vet"></p>
  </div>
`;

function formatDate(date) {
  return dayjs(date).format('MM/DD/YYYY');
}

export default function VaccineItem({ id, title, vet, date }) {
  Component.call(this, { html, events });

  if (id) this.setId(id);
  if (title) this.setTitle(title);
  if (vet) this.setVet(vet);
  if (date) this.setDate(date);
}

VaccineItem.prototype = Object.assign(
  VaccineItem.prototype,
  Component.prototype,
  {
    getId() {
      return this.id;
    },
    getTitle() {
      return this.title;
    },
    getVet() {
      return this.vet;
    },
    getDate() {
      return this.date;
    },
    setId(id) {
      this.id = id;
      this.emit('id:change', id);
    },
    setTitle(title) {
      this.title = title;
      this.selected.get('body-title').textContent = title;
      this.emit('title:change', title);
    },
    setVet(vet) {
      this.vet = vet;
      this.selected.get('body-vet').textContent = vet;
      this.emit('vet:change', vet);
    },
    setDate(date) {
      this.date = date;
      const dateFormatted = formatDate(date);
      this.selected.get('body-date').textContent = dateFormatted;
      this.emit('date:change', date);
    },
  },
);
