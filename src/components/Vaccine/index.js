import { Component } from 'pet-dex-utilities';
import VaccineGroup from '../VaccineGroup';
import vaccineUrl from './images/vaccine.svg';
import addVaccineUrl from './images/plus.svg';
import './index.scss';

const events = ['open', 'change:group'];

const html = `
  <div class="vaccine-container" data-select="vaccine-container">
    <div class="vaccine-container__header" data-select-"vaccine-header">
      <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
      <p class="vaccine-container__text"> Vacinas </p>
      <div class="vaccine-container__add-vacine" data-select="vaccine-add-vaccine"> 
        <img class="vaccine-container__add-vaccine-img" src="${addVaccineUrl}" alt="add-vaccine-icon" 
        data-select="add-vacine-icon" /> 
        <p class="vaccine-container__add-vacine-text" data-select="add-vacine-text"> Adicionar Vacina </p>
      </div>
    </div>
    <div class="vaccine-container__list-group"> 
    <div class="vaccine-container__sections" data-select="vaccine-list-group"> </div>
    </div>
  </div>
`;

export default function Vaccine({ vaccinesList = [] } = {}) {
  Component.call(this, { html, events });

  const $vaccineAddDiv = this.selected.get('vaccine-add-vaccine');

  this.groups = new Map();

  if (vaccinesList.length) {
    this.loadVacina(vaccinesList);
  }

  $vaccineAddDiv.addEventListener('click', () => {
    this.open();
  });
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  open() {
    this.emit('open');
  },
  addVaccine(vaccine) {
    const dateYear = new Date(vaccine.date).getFullYear();
    const group = this.groups.get(dateYear);
    const $vaccineList = this.selected.get('vaccine-list-group');

    if (group) {
      group.addItem(vaccine);
      this.emit('change:group', vaccine);
      return;
    }
    const vaccineGroup = new VaccineGroup(dateYear, vaccine);
    vaccineGroup.mount($vaccineList);

    this.groups.set(dateYear, vaccineGroup);
    this.emit('change:group', vaccine);
  },
  removeGroup(year) {
    const group = this.groups.get(year);
    if (!group) return;

    this.emit('change:group', group);
    this.groups.delete(year);
  },
  getGroup(year) {
    const group = this.groups.get(year);
    return group;
  },
  loadVacina(vaccineList) {
    vaccineList.forEach((vaccine) => {
      this.addVaccine(vaccine);
    });
  },
});
