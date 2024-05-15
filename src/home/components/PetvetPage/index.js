import { Component } from 'pet-dex-utilities';
// import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Radio from '../../../components/RadioButton';

import estetoscopio from './images/estetoscopio.svg';
import cuidadosEspeciais from './images/cuidadosEspeciais.svg';
import { listenBreakpoint } from '../../../utils/breakpoints/breakpoints';

import './index.scss';

const html = `
<div data-select="container" class="petvet-page">
   <div class="petvet-page__header">
      <p class="petvet-page__header--text">Conte-nos um pouco mais do seu animal</p>
      <p class="petvet-page__header--subtext">Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele! </p>
   </div>
   <div class="petvet-page__card-group">
      <div class="petvet-page__card">
        <div class="petvet-page__card-header">
            <a href="#"><img class="petvet-page__img" src="${estetoscopio}" alt="estetoscopio"></a>
            <p class="petvet-page__card-text">O seu pet amigo foi castrado?</p>
            <div class="petvet-page__radio-group" data-select="special-care">
            </div>
        </div>
      </div>
      <div class="petvet-page__card">
        <div class="petvet-page__card-header">
          <div>
            <a href="#"><img class="petvet-page__img" src="${cuidadosEspeciais}" alt="cuidados especiais"></a>
          </div>
          <div>
            <p class="petvet-page__card-text">Cuidados especiais</p>
            <div class="petvet-page__radio-group" data-select="registered">
          </div>
          </div>
        </div>
      </div>
   </div>
</div>
`;

const events = ['value'];

function createAndMount({ name, text, mountTo }) {
  const radio = new Radio({ name, text });
  radio.mount(mountTo);
  return radio;
}

export default function PetVetPage() {
  Component.call(this, { html, events });
  const $container = this.selected.get('container');
  const $specialCare = this.selected.get('special-care');
  const $registered = this.selected.get('registered');

  const form = {
    isRegistered: undefined,
    isSpecialCare: undefined,
    specialCareText: false,
  };

  const specialCare = [
    createAndMount({ name: 'specialCare', text: 'Yes', mountTo: $specialCare }),
    createAndMount({ name: 'specialCare', text: 'No', mountTo: $specialCare }),
  ];
  const registered = [
    createAndMount({ name: 'registered', text: 'Yes', mountTo: $registered }),
    createAndMount({ name: 'registered', text: 'No', mountTo: $registered }),
  ];

  registered.forEach((radio) => {
    radio.listen('change', (value) => {
      const text = radio.getText();
      form.isRegistered = text === 'Yes' ? value : !value;
    });
  });

  specialCare.forEach((radio) => {
    radio.listen('change', (value) => {
      const text = radio.getText();
      form.isSpecialCare = text === 'Yes' ? value : !value;
    });
  });

  this.button = new Button({
    text: 'Concluir',
    isFullWidth: true,
    isDisabled: false,
  });
  this.button.mount($container);

  const $button = this.button.selected.get('button');
  $button.classList.add('petvet-page__button');

  const emitForm = () => {
    this.emit('value', form);
  };

  this.button.listen('click', emitForm);
}

PetVetPage.prototype = Object.assign(PetVetPage.prototype, Component.prototype);
