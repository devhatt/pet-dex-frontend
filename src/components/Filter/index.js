import { Component } from 'pet-dex-utilities';
import './index.scss';
import { api } from '../../utils/api/api';

const events = [];

/**
 * @typedef {Object} FilterOptions
 * @property {string} boldText - The bold text to be displayed in the filter label.
 * @property {string} regularText - The regular text to be displayed in the filter label.
 * @property {string} inputPlaceholder - The placeholder text for the filter input.
 * @property {string} [endpoint] - The API endpoint to fetch filter options from.
 * @property {Array} [options] - The array of filter options.
 * @property {string} options[].label - The label for the filter option.
 * @property {string} options[].type - The type of the filter option (radio or checkbox).
 * @property {Array} options[].values - The values for the filter option.
 */

const html = `
  <div class="filter">
    <label class="filter__label" data-select="text">
        <p><b class="filter__label__bold" data-select="boldText"></b></p>
        <p class="filter__label__regular" data-select="regularText"></p>
    </label>
    <div class="filter__actions">
      <span class="filter__actions__input__icon">
        <input class="filter__actions__input" type="text" data-select="input-text" placeholder="" />
      </span>
      <div class="filter__actions__button">Filtrar</div>
    </div>
  </div>
`;

function validateFilterOptions(filterOptions) {
  if (!filterOptions) throw new TypeError('Filter options are required');
  if (!filterOptions.inputPlaceholder) throw new TypeError('Filter inputPlaceholder is required');
  if (!filterOptions.endpoint && !filterOptions.options) throw new TypeError('Filter endpoint or options are required');
}

export default function Filter(filterOptions) {
  Component.call(this, { html, events });

  this.filterOptions = filterOptions || {
    // boldText: 'Qual é a raça do seu animal de estimação?',
    regularText: 'Deixe-nos saber que tipo e o seu animal de estimação',
    inputPlaceholder: 'Pesquise por uma espécie',
  };

  // remover
  this.filterOptions.endpoint = 'https://api.thecatapi.com/v1/breeds';
  validateFilterOptions(this.filterOptions);
  if (this.filterOptions.endpoint) {
    api(this.filterOptions.endpoint, 'GET').then((response) => {
      this.filterOptions.options = response;
    });
  }

  console.log(this.filterOptions);

  const $boldText = this.selected.get('boldText');
  const $regularText = this.selected.get('regularText');
  const $inputText = this.selected.get('input-text');

  // this.selected.get('text').style.display = 'none';

  $boldText.innerText = this.filterOptions.boldText ? this.filterOptions.boldText : '';
  $regularText.innerText = this.filterOptions.regularText ? this.filterOptions.regularText : '';
  $inputText.placeholder = this.filterOptions.inputPlaceholder;
}

Filter.prototype = Object.assign(
  Filter.prototype,
  Component.prototype,
  {
  },
);
