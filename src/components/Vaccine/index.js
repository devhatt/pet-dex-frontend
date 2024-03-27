import { Component } from 'pet-dex-utilities';
import vaccineUrl from './img/vaccine.svg';
import './index.scss';

const events = ['active'];

const html = `
  <div class="vaccine-container" data-select="vaccine-container">
    <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
    <p class="vaccine-container__text" data-select="vaccine-add-Vaccine"> + Adicionar Vacina </p>
  </div>
`;

export default function Vaccine() {
  Component.call(this, { html, events });

  const $vaccineAddText = this.selected.get('vaccine-add-Vaccine');

  $vaccineAddText.addEventListener('click', () => {
    this.open();
  });
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  open() {
    const $vaccineContainer = this.selected.get('vaccine-container');
    $vaccineContainer.classList.add('vaccine-container--active');
  },
});
