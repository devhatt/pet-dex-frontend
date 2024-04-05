import { Component } from 'pet-dex-utilities';
import vaccineUrl from './img/vaccine.svg';
import './index.scss';

const html = `
  <div class="vaccine-container" >
    <div class="vaccine-container__card">
      <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
      <p class="vaccine-container__text" data-select="vaccine-add-vaccine"> + Adicionar Vacina </p>
    </div>
    <div class="vaccine-container__vaccine-list" data-select="vaccine-list">
  </div>
`;

export default function Vaccine() {
  Component.call(this, { html });

  const $vaccineAddText = this.selected.get('vaccine-add-vaccine');

  $vaccineAddText.addEventListener('click', () => {
    this.open();
  });

  const vaccines = []; // receives from drawer

  if (vaccines.length) {
    const $vaccineContainer = this.selected.get('vaccine-list');
    $vaccineContainer.classList.add('vaccine-list--active');

    vaccines.forEach((sicknessObject) => {
      const dateYear = new Date(sicknessObject.date).getFullYear();
      const htmlToInsert = `
      <div class="vaccine-container__year-body">
        <p class="vaccine-container__sickness-body"> ${sicknessObject.sickness} </p>
        <p class="vaccine-container__info-body date"> ${sicknessObject.date} </p>
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
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  open() {
    // open the drawer component
  },
});
