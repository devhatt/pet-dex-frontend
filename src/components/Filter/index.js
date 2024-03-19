import { Component } from 'pet-dex-utilities';
import FilterDropDown from './Filter_DropDown';
import './index.scss';
import { api } from '../../utils/api/api';

const events = ['fetchList'];

/**
 * @typedef {Object} FilterOptions
 * @property {string} boldText - The bold text to be displayed in the filter label.
 * @property {string} regularText - The regular text to be displayed in the filter label.
 * @property {string} inputPlaceholder - The placeholder text for the filter input.
 * @property {string} [endpoint] - The API endpoint to fetch filter options from.
 * @property {Array} [options] - The array of filter options.
 * @property {string} options[].title - The label for the filter option.
 * @property {string} options[].type - The type of the filter option (radio or checkbox).
 * @property {Array} options[].values - The values for the filter option.
 */

const html = `
  <div class="filter">
    <label class="filter__label" data-select="text">
        <p><b class="filter__label__bold" data-select="bold-text"></b></p>
        <p class="filter__label__regular" data-select="regular-text"></p>
    </label>
    <div class="filter__actions">
      <span class="filter__actions__input__icon">
        <input class="filter__actions__input" type="text" data-select="input-text" placeholder="" />
      </span>
      <div class="filter__actions__container" data-select="drop-down-conteiner">
        <div class="filter__actions__container__button" data-select="drop-down-button">
          <span class="filter__actions__container__button__counter" data-select="drop-down-counter"></span>
          Filtrar
        </div>
      </div>
    </div>
  </div>
`;

function validateFilterOptions(filterOptions) {
  if (!filterOptions) throw new TypeError('Filter options are required');
  if (!filterOptions.inputPlaceholder) throw new TypeError('Filter inputPlaceholder is required');
  if (!filterOptions.endpoint) throw new TypeError('Filter endpoint is required');
}

function hasLabel(filterOptions) {
  return filterOptions.boldText || filterOptions.regularText;
}

export default function Filter(filterOptions) {
  Component.call(this, { html, events });

  validateFilterOptions(filterOptions);

  this.filterOptions = filterOptions;
  this.selectedValues = [];
  this.queryString = '';

  const $inputText = this.selected.get('input-text');
  const $dropDownContainer = this.selected.get('drop-down-conteiner');
  const $dropDownButton = this.selected.get('drop-down-button');

  this.displayText();

  $inputText.placeholder = this.filterOptions.inputPlaceholder;

  const dropDownOptions = this.fetchOptions();
  this.dropDown = new FilterDropDown(dropDownOptions);
  document.addEventListener('click', this.documentClickHandler.bind(this));

  $dropDownButton.addEventListener('click', () => {
    this.buttonHandler($inputText.value);
  });

  this.dropDown.listen('selectNewOptions', (selectedOptions) => {
    this.selectNewOptionsHandler(selectedOptions, $dropDownButton);
  });

  this.dropDown.mount($dropDownContainer);
}

Filter.prototype = Object.assign(Filter.prototype, Component.prototype, {
  fetchList: function fetchList(inputString) {
    const apiEndPont = `${this.filterOptions.endpoint}?${this.queryString}&search=${inputString.replace(/ /g, '%20')}`;
    const responseEmit = api(apiEndPont, 'GET').then((response) => response);
    this.emit('fetchList', responseEmit);
  },
  fetchOptions: function fetchOptions() {
    if (!this.filterOptions.options.length) {
      api(this.filterOptions.endpoint, 'OPTIONS').then((response) => {
        this.filterOptions.options = response;
      });
    }
    return this.filterOptions.options;
  },
  displayText: function displayText() {
    const $textConteiner = this.selected.get('text');
    const $boldText = this.selected.get('bold-text');
    const $regularText = this.selected.get('regular-text');
    if (hasLabel(this.filterOptions)) {
      $boldText.innerHTML = this.filterOptions.boldText;
      $regularText.innerHTML = this.filterOptions.regularText;
    } else {
      $textConteiner.style.display = 'none';
    }
  },
  buttonHandler: function buttonHandler(inputString) {
    if (this.selectedValues.length > 0 && this.dropDown.isVisible()) {
      this.fetchList(inputString);
    }
    this.dropDown.toogleDisplay();
  },
  documentClickHandler: function documentClickHandler(event) {
    if (
      this.dropDown.isVisible()
      && !event.target.closest('.filter__drop-down')
      && !event.target.closest('.filter__actions__container__button')
    ) {
      this.dropDown.toogleDisplay();
    }
  },
  selectNewOptionsHandler: function selectNewOptionsHandler(selectedOptions, $dropDownButton) {
    this.selectedValues = selectedOptions.values;
    this.queryString = selectedOptions.queryGetString;

    $dropDownButton.classList.toggle(
      'filter__actions__container__button--selected',
      this.selectedValues.length > 0,
    );
    const $optionCounter = this.selected.get('drop-down-counter');
    $optionCounter.classList.toggle(
      'filter__actions__container__button__counter--selected',
      this.selectedValues.length > 0,
    );
    $optionCounter.innerHTML = this.selectedValues.length > 0 ? `${this.selectedValues.length}` : '';
    $dropDownButton.replaceChild($optionCounter, $dropDownButton.firstChild);
  },
});
