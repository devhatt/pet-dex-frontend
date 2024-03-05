import { Component } from 'pet-dex-utilities';
import './index.scss';

const MockedApiService = {
  getFilter: () => Promise.resolve([]),
};

const events = [];

const html = `
  <div class="filter">
    <label class="filter__label">
        <p><b>Qual é a raça do seu animal de estimação?</b></p>
        <p>Deixe-nos saber que tipo e o seu animal de estimação</p>
    </label>
    <input class="filter__input" type="text" placeholder="Pesquise por uma espécie" />
    <button class="filter__button">Filtrar</button>
  </div>
`;

export default function Filter(filterOptions = [{}]) {
  Component.call(this, { html, events });
  MockedApiService.getFilter().then((filterOptionstemp) => {
    this.filterOptions = filterOptions || filterOptionstemp;
  });
}

Filter.prototype = Object.assign(
  Filter.prototype,
  Component.prototype,
  {
  },
);
