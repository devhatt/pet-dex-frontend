import { Component } from 'pet-dex-utilities';
import FilterDropDown from './Filter_DropDown';
import './index.scss';
import { api } from '../../utils/api/api';

const events = ['fetchList'];

/**
 * @typedef {Object} FilterOptions
 * @property {string} [endpoint] - The API endpoint to fetch filter options from.
 * @property {Array} [options] - The array of filter options.
 * @property {string} options[].title - The label for the filter option.
 * @property {string} options[].type - The type of the filter option (radio or checkbox).
 * @property {Array} options[].values - The values for the filter option.
 */

const html = `
  <div class="filter">
    <div class="filter__container" data-select="drop-down-conteiner">
      <div class="filter__container__button" data-select="drop-down-button">
        <span class="filter__container__button__counter" data-select="drop-down-counter"></span>
        Filtrar
      </div>
    </div>
  </div>
`;

function validateFilterOptions(filterOptions) {
  if (!filterOptions) throw new TypeError('Filter options are required');
  if (!filterOptions.endpoint && !filterOptions.options) {
    throw new TypeError('Filter options must have an endpoint or options');
  }
}

export default function Filter(filterOptions) {
  Component.call(this, { html, events });

  validateFilterOptions(filterOptions);

  this.filterOptions = filterOptions;
  this.selectedValues = [];

  const $dropDownContainer = this.selected.get('drop-down-conteiner');
  const $dropDownButton = this.selected.get('drop-down-button');

  const dropDownOptions = this.fetchOptions();

  this.dropDown = new FilterDropDown(dropDownOptions);
  this.dropDown.listen('selectNewOptions', (selectedOptions) => {
    this.selectNewOptionsHandler(selectedOptions, $dropDownButton);
  });
  this.dropDown.mount($dropDownContainer);

  document.addEventListener('click', this.documentClickHandler.bind(this));
  $dropDownButton.addEventListener('click', this.buttonHandler.bind(this));

  this.listen('unmount', () => {
    document.removeEventListener('click', this.documentClickHandler.bind(this));
    $dropDownButton.removeEventListener('click', this.buttonHandler.bind(this));
  });
}

Filter.prototype = Object.assign(Filter.prototype, Component.prototype, {
  fetchOptions: function fetchOptions() {
    if (!this.filterOptions.options.length) {
      api(this.filterOptions.endpoint, 'GET').then((response) => {
        this.filterOptions.options = response;
      });
    }
    return this.filterOptions.options;
  },
  buttonHandler: function buttonHandler() {
    if (this.selectedValues.length > 0 && this.dropDown.isVisible()) {
      this.emit('filter', this.selectedValues);
    }
    this.dropDown.toogleDisplay();
  },
  documentClickHandler: function documentClickHandler(event) {
    if (
      this.dropDown.isVisible() &&
      !event.target.closest('.filter__drop-down') &&
      !event.target.closest('.filter__container__button')
    ) {
      this.dropDown.toogleDisplay();
    }
  },
  selectNewOptionsHandler: function selectNewOptionsHandler(
    selectedOptions,
    $dropDownButton,
  ) {
    this.selectedValues = selectedOptions.values;

    $dropDownButton.classList.toggle(
      'filter__container__button--selected',
      this.selectedValues.length > 0,
    );

    const $optionCounter = this.selected.get('drop-down-counter');
    $optionCounter.classList.toggle(
      'filter__container__button__counter--selected',
      this.selectedValues.length > 0,
    );
    $optionCounter.innerHTML =
      this.selectedValues.length > 0 ? `${this.selectedValues.length}` : '';
    $dropDownButton.replaceChild($optionCounter, $dropDownButton.firstChild);
  },
});
