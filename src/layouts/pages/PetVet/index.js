import { Component } from 'pet-dex-utilities';
import Button from '~src/components/Button';
import Radio from '~src/components/RadioButton';
import TextArea from '~src/components/TextArea';
import Vaccine from '~src/components/Vaccine';

import cuidadosEspeciais from './images/cuidadosEspeciais.svg';
import estetoscopio from './images/estetoscopio.svg';

import './index.scss';

const html = `
  <div data-select="container" class="petvet-page">
    <div class="petvet-page__content">
      <div class="petvet-page__header">
        <p class="petvet-page__header--text">Conte-nos um pouco mais do seu animal</p>
        <p class="petvet-page__header--subtext">Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele!</p>
      </div>
      <div class="petvet-page__card-group" data-select="card-group">
        <div class="petvet-page__card">
          <div class="petvet-page__card-header">
            <div>
              <a href="#"><img class="petvet-page__img" src="${estetoscopio}" alt="estetoscopio" /></a>
            </div>
            <div class="petvet-page__card-content">
              <p>O seu pet amigo foi castrado?</p>
              <form>
              <fieldset data-select="neutered-radio" class="petvet-page__neutered-radio"></fieldset>
              </form>
            </div>
          </div>
        </div>
        <div class="petvet-page__card" data-select="special-care">
          <div class="petvet-page__card-header">
            <div class="petvet-page__icon-text">
              <a href="#"><img class="petvet-page__img" src="${cuidadosEspeciais}" alt="cuidados especiais" /></a>
            </div>
            <div class="petvet-page__card-content">
              <p>Cuidados especiais</p>
              <form>
                <fieldset data-select="special-care-radio" class="petvet-page__special-care-radio"></fieldset>
              </form>
            </div>
          </div>
          <div class="petvet-page__card-text" data-select="special-care-text"></div>
        </div>
      </div>
    </div>
    <div class="petvet-page__footer" data-select="footer"></div>
  </div>
`;

const events = ['submit'];

function getAriaLabel(radioName) {
  const arias = {
    specialCare: 'cuidados-especiais',
    neutered: 'castrado',
  };
  return arias[radioName];
}

function getBooleanValue(value) {
  const radiosValue = {
    specialCare: true,
    neutered: true,
  };
  return value in radiosValue ? radiosValue[value] : false;
}

function createAndMount({ name, text, mountTo, value, borderless }) {
  const radio = new Radio({ name, text, value, borderless });
  radio.selected
    .get('radio-button')
    .setAttribute('aria-label', `${getAriaLabel(name)}-${text.toLowerCase()}`);
  radio.mount(mountTo);
  return radio;
}

export default function PetVetPage({ vaccines = [] } = {}) {
  Component.call(this, { html, events });

  const $footer = this.selected.get('footer');
  const $specialCareRadio = this.selected.get('special-care-radio');
  const $specialCareText = this.selected.get('special-care-text');
  const $neuteredRadio = this.selected.get('neutered-radio');
  const $cardGroup = this.selected.get('card-group');

  this.vaccine = new Vaccine({ vaccines });
  this.vaccine.mount($cardGroup);

  const notSpecialCare = createAndMount({
    name: 'specialCare',
    text: 'Não',
    mountTo: $specialCareRadio,
    value: 'notSpecialCare',
    borderless: true,
  });
  const specialCare = createAndMount({
    name: 'specialCare',
    text: 'Sim',
    mountTo: $specialCareRadio,
    value: 'specialCare',
    borderless: true,
  });
  createAndMount({
    name: 'neutered',
    text: 'Não',
    mountTo: $neuteredRadio,
    value: 'notNeutered',
    borderless: true,
  });
  createAndMount({
    name: 'neutered',
    text: 'Sim',
    mountTo: $neuteredRadio,
    value: 'neutered',
    borderless: true,
  });

  this.specialCareText = new TextArea({
    name: 'specialCareText',
    placeholder: 'Escreva o cuidado especial',
    maxLength: 500,
    required: true,
  });

  specialCare.listen('change', () => {
    this.specialCareText.mount($specialCareText);
    this.specialCareText.selected
      .get('textarea')
      .classList.add('petvet-page__textarea');
  });
  notSpecialCare.listen('change', () => {
    this.specialCareText.selected.get('textarea').value = '';
    this.specialCareText.unmount($specialCareText);
  });

  this.button = new Button({
    text: 'Concluir',
    isFullWidth: false,
    isDisabled: false,
  });

  this.button.selected.get('button').classList.add('petvet-page__button');
  this.button.mount($footer);

  const form = {
    isNeutered: undefined,
    isSpecialCare: undefined,
    specialCareText: '',
    vaccines: undefined,
  };

  const emitForm = () => {
    const neuteredValue = document.forms[0].elements.neutered.value;
    const specialCareValue = document.forms[1].elements.specialCare.value;
    const specialCareText = this.specialCareText.selected.get('textarea').value;

    if (!neuteredValue || !specialCareValue) return;
    if (getBooleanValue(specialCareValue) && !specialCareText) return;

    form.isNeutered = getBooleanValue(neuteredValue);
    form.isSpecialCare = getBooleanValue(specialCareValue);
    form.specialCareText = specialCareText;

    form.vaccines = this.vaccine.listVaccines();
    this.emit('submit', form);
  };

  this.button.listen('click', emitForm);
}

PetVetPage.prototype = Object.assign(PetVetPage.prototype, Component.prototype);
