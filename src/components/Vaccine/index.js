import { Component } from 'pet-dex-utilities';
import VaccineGroup from '../VaccineGroup';
import vaccineUrl from './images/vaccine.svg';
import addVaccineUrl from './images/plus.svg';
import './index.scss';

const events = ['drawer:open', 'group:add', 'group:change', 'group:remove'];

const html = `
  <div class="vaccine" data-select="vaccine-container">
    <div class="vaccine__header">
      <div class="vaccine__header-title"> 
        <img class="vaccine__img" src="${vaccineUrl}" alt="vaccine" />
        <p class="vaccine__text">Vacinas</p>
      </div>
      <div class="vaccine__add-vacine" data-select="add-vaccine"> 
        <div class="vaccine__add-vacine">
          <img class="vaccine__add-vaccine-img" src="${addVaccineUrl}" alt="add-vaccine-icon" data-select="add-vacine-icon" /> 
          <p class="vaccine__add-vacine-text" data-select="add-vacine-text">Adicionar Vacina</p>
        </div>
      </div>
    </div>
    <div class="vaccine__scroll">
      <div class="vaccine__sections" data-select="group"> </div>
    </div>
  </div>
`;

export default function Vaccine({ vaccines = [] } = {}) {
  Component.call(this, { html, events });

  const $addVaccineContainer = this.selected.get('add-vaccine');
  this.groups = new Map();
  if (vaccines.length) this.loadVaccines(vaccines);

  $addVaccineContainer.addEventListener('click', () => {
    this.openDrawer();
  });
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  getGroup(vaccine) {
    const dateYear = new Date(vaccine.date).getFullYear();
    return this.groups.get(dateYear);
  },
  setGroup(vaccine) {
    const year = new Date(vaccine.date).getFullYear();
    const vaccineGroup = new VaccineGroup({ year, vaccine });
    const $groupContainer = this.selected.get('group');

    vaccineGroup.mount($groupContainer);

    this.groups.set(year, vaccineGroup);
    this.emit('group:add', vaccine);
  },
  removeGroup(year) {
    const group = this.groups.get(year);
    if (!group) return;

    this.emit('group:remove', group);
    this.groups.delete(year);
  },
  addVaccine(vaccine, group) {
    group.setItem(vaccine);
    this.emit('group:change', vaccine);
  },
  loadVaccines(vaccines) {
    vaccines.forEach((vaccine) => {
      const group = this.getGroup(vaccine);
      if (group) {
        this.addVaccine(vaccine, group);
        return;
      }
      this.setGroup(vaccine);
    });
  },
  listVaccines() {
    const vaccines = [];

    this.groups.values().forEach((group) => {
      const items = group.listItems();
      vaccines.push(...items);
    });
    return vaccines;
  },
  openDrawer() {
    this.emit('drawer:open');
  },
});
