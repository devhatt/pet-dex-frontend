import { Component } from 'pet-dex-utilities';
import vaccineUrl from './images/vaccine.svg';
import addVaccineUrl from './images/plus.svg';
import calendarUrl from './images/calendar.svg';
import variables from '../../styles/breakpoints.module.scss';
import './index.scss';

const { mediumSize } = variables;
const events = ['open'];

const html = `
  <div class="vaccine-container" data-select="vaccine-container">
    <div class="vaccine-container__card" data-select-"vaccine-card">
      <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
      <p class="vaccine-container__text"> Vacinas </p>
      <div class="vaccine-container__add-vacine" data-select="vaccine-add-vaccine"> 
        <img class="vaccine-container__add-vaccine-img" src="${addVaccineUrl}" alt="add-vaccine" /> 
      </div>
    </div>
  </div>
`;

function formatDate(dataISO) {
  const date = new Date(dataISO);
  return new Intl.DateTimeFormat('pt-BR').format(date).replaceAll('/', '.');
}

function loadVaccineList(vaccinesList, $container) {
  vaccinesList.forEach((vaccineObject) => {
    const dateYear = new Date(vaccineObject.date).getFullYear();
    const htmlToInsert = `
    <div class="vaccine-container__year-body">
      <p class="vaccine-container__info-body vaccine"> ${vaccineObject.vaccine} </p>
      <div class="vaccine-container__info-body date">
        <img src=${calendarUrl} alt="calendar">
        <p class=""> ${formatDate(vaccineObject.date)} </p>
      </div>
      <p class="vaccine-container__info-body"> ${vaccineObject.vet} </p>
    </div>  
    `;
    const $yearSection = $container.querySelector(
      `div.vaccine-container__vaccine-section[year="${dateYear}"]`,
    );

    if ($yearSection) {
      $yearSection.innerHTML += htmlToInsert;
      return;
    }

    const $vaccineList = document.createElement('div');
    const $titleYear = `<p class="vaccine-container__vaccine-year-title"> ${dateYear} </p>`;

    $vaccineList.innerHTML = $titleYear + htmlToInsert;
    $vaccineList.classList.add('vaccine-container__vaccine-section');
    $vaccineList.setAttribute('year', dateYear);
    $container.appendChild($vaccineList);
  });
}

export default function Vaccine({ vaccinesList = [] } = {}) {
  Component.call(this, { html, events });

  const $vaccineAddDiv = this.selected.get('vaccine-add-vaccine');
  const $vaccineContainer = this.selected.get('vaccine-container');

  if (window.matchMedia(`(min-width: ${mediumSize})`).matches) {
    $vaccineAddDiv.innerHTML +=
      '<p class="vaccine-container__add-vacine-text"> Adicionar Vacina </p>';
  }

  $vaccineAddDiv.addEventListener('click', () => {
    this.open();
  });

  if (vaccinesList.length) {
    loadVaccineList(vaccinesList, $vaccineContainer);
  }
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  open() {
    this.emit('open');
  },
});
