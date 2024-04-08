import { Component } from 'pet-dex-utilities';
import vaccineUrl from './img/vaccine.svg';
import './index.scss';

const html = `
  <div class="vaccine-container" data-select="vaccine-container">
    <div class="vaccine-container__card">
      <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
      <p class="vaccine-container__text" data-select="vaccine-add-vaccine"> + Adicionar Vacina </p>
    </div>
  </div>
`;

export default function Vaccine({ vaccinesList = [] }) {
  Component.call(this, { html });

  const $vaccineAddText = this.selected.get('vaccine-add-vaccine');
  const $vaccineContainer = this.selected.get('vaccine-container');

  $vaccineAddText.addEventListener('click', () => {
    this.open();
  });

  function formatDate(dataISO) {
    const date = new Date(dataISO);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function loadVaccineList() {
    vaccinesList.forEach((sicknessObject) => {
      const dateYear = new Date(sicknessObject.date).getFullYear();
      const htmlToInsert = `
      <div class="vaccine-container__year-body">
        <p class="vaccine-container__sickness-body"> ${sicknessObject.vaccine} </p>
        <p class="vaccine-container__info-body date"> ${formatDate(sicknessObject.date)} </p>
        <p class="vaccine-container__info-body"> ${sicknessObject.vet} </p>
      </div>  
      `;
      const $yearSection = $vaccineContainer.querySelector(
        `div.vaccine-container__vaccine-section[year="${dateYear}"]`,
      );

      if ($yearSection) {
        $yearSection.innerHTML += htmlToInsert;
      } else {
        const $vaccineList = document.createElement('div');
        const $titleYear = `<p class="vaccine-container__vaccine-title"> ${dateYear} </p>`;

        $vaccineList.innerHTML = $titleYear + htmlToInsert;
        $vaccineList.classList.add('vaccine-container__vaccine-section');
        $vaccineList.setAttribute('year', dateYear);
        $vaccineContainer.appendChild($vaccineList);
      }
    });
  }

  if (vaccinesList.length) {
    loadVaccineList();
  }
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  open() {
    // open the drawer component
  },
});
