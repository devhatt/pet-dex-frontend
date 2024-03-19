import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['selectNewOptions'];

const html = `
  <div class="filter__drop-down" data-select="drop-down">
    
  </div>
`;

function addOption(htmlElement, option) {
  const $title = document.createElement('h2');
  $title.innerHTML = option.title;
  $title.classList.add('filter__drop-down__title');
  htmlElement.appendChild($title);

  const $hr = document.createElement('hr');
  $hr.classList.add('filter__drop-down__hr');
  htmlElement.appendChild($hr);

  const $options = document.createElement('div');
  $options.classList.add('filter__drop-down__options');
  htmlElement.appendChild($options);

  option.values.forEach((value) => {
    const $element = document.createElement('div');
    const $elementValue = document.createElement('input');
    const $elementLabel = document.createElement('label');
    $elementValue.type = option.type;
    $elementValue.value = value;
    $elementValue.name = option.title;
    $elementLabel.innerHTML = value;
    $element.classList.add('filter__drop-down__options__element');
    $elementValue.classList.add('filter__drop-down__options__value');
    $elementLabel.classList.add('filter__drop-down__options__label');
    $elementLabel.htmlFor = value;
    $elementValue.id = value;
    $element.appendChild($elementValue);
    $element.appendChild($elementLabel);
    $options.appendChild($element);
  });
}

export default function FilterDropDown(options) {
  Component.call(this, { html, events });

  const $dropDownContainer = this.selected.get('drop-down');

  options.forEach((option) => {
    addOption($dropDownContainer, option);
  });

  const $options = $dropDownContainer.querySelectorAll(
    '.filter__drop-down__options__value',
  );
  $options.forEach(($option) => {
    $option.addEventListener('change', () => {
      this.selectNewOptions();
    });
  });
}

FilterDropDown.prototype = Object.assign(
  FilterDropDown.prototype,
  Component.prototype,
  {
    selectedValues: function selectedValues() {
      const $dropDownContainer = this.selected.get('drop-down');
      const $options = $dropDownContainer.querySelectorAll(
        '.filter__drop-down__options__value',
      );
      const values = [];

      let queryGetString = '';

      $options.forEach(($option) => {
        if ($option.checked) {
          values.push($option.value);
          queryGetString += `${$option.name}=${$option.value}&`;
        }
      });

      queryGetString = queryGetString.slice(0, -1);
      queryGetString = queryGetString.replace(/ /g, '%20');
      return { values, queryGetString };
    },
    selectNewOptions: function selectNewOptions() {
      this.emit('selectNewOptions', this.selectedValues());
    },
    toogleDisplay: function toogleDisplay() {
      const $dropDownContainer = this.selected.get('drop-down');
      if (
        !$dropDownContainer.style.display ||
        $dropDownContainer.style.display === 'none'
      ) {
        $dropDownContainer.style.display = 'block';
        const yContainerPosition = $dropDownContainer.getBoundingClientRect().y;
        const windowHeight = window.innerHeight;
        $dropDownContainer.style.maxHeight = `${windowHeight - yContainerPosition - 120}px`;
      } else {
        $dropDownContainer.style.display = 'none';
      }
    },
    isVisible: function isVisible() {
      const $dropDownContainer = this.selected.get('drop-down');
      return $dropDownContainer.style.display === 'block';
    },
  },
);
