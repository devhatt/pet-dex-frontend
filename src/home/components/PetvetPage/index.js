import { Component } from 'pet-dex-utilities';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';

import estetoscopio from './images/estetoscopio.svg';
import cuidadosEspeciais from './images/cuidadosEspeciais.svg';
import vacina from './images/vacina.svg';

import './index.scss';

const html = `
<div data-select="container" class="petvet-page">
    <div class="petvet-page__content">
        <div class="petvet-page__header">
            <p class="petvet-page__header--head">Conte-nos um pouco mais do seu animal</p>
            <p class="petvet-page__header--subhead"> Seu pet já foi vacinado? Conta pra gente que mês ou ano que você
                costuma comemorar o aniversário dele! </p>
        </div>
        <div class="petvet-page__card-group">
            <div class="petvet-page__card">
                <div class="petvet-page__card-content">
                    <a href="#"><img class="petvet-page__img" src="${estetoscopio}" alt="estetoscopio"></a>
                    <div class="petvet-page__text-and-form">
                        <p class="petvet-page__card-text">O seu pet amigo foi castrado?</p>
                        <div class="petvet-page__checkbox-group">
                            <div class="petvet-page__input">
                                <input name="isRegisteredNo" type="checkbox">
                                <label for="isRegisteredNo" class="petvet-page__card--label"> Não </label>
                            </div>
                            <div class="petvet-page__input">
                                <input name="isRegisteredYes" type="checkbox">
                                <label for="isRegisteredYes" class="petvet-page__card--label"> Sim </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="petvet-page__card">
                <div class="petvet-page__card-content cuidados-especiais">
                    <a href="#"><img class="petvet-page__img" src="${cuidadosEspeciais}" alt="cuidados especiais"></a>
                    <div class="petvet-page__text-and-form">
                    <p class="petvet-page__card-text">Cuidados especiais</p>
                    <div class="petvet-page__checkbox-group">
                        <div class="petvet-page__input">
                            <input name="specialCareNo" type="checkbox">
                            <label for="specialCareNo" class="petvet-page__card--label"> Não </label>
                        </div>
                        <div class="petvet-page__input">
                            <input name="specialCareYes" type="checkbox">
                            <label for="specialCareYes" class="petvet-page__card--label"> Sim </label>
                        </div>
                    </div>
  </div>
                </div>
            </div>
            <div class="petvet-page__card">
                <div class="petvet-page__card-content">
                    <a href="#"><img class="petvet-page__img" src="${vacina}" alt="vacina"></a>
                    <div class="petvet-page__text-and-form">
                    <p class="petvet-page__card-text">Vacinas</p>
                    <p class="petvet-page__card-text"> + Adicionar Vacina </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
`;

export default function PetVetPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.textInput = new TextInput({
    placeholder: 'Escreva o cuidado especial',
  });
  this.button = new Button({
    text: 'Concluir',
  });

  this.textInput.mount($container);
  this.button.mount($container);

  const $input = this.textInput.selected.get('input-text');
  const $button = this.button.selected.get('button');

  $input.classList.add('petvet-page__input-text');
  $button.classList.add('petvet-page__button');
  $container.querySelector('.petvet-page__content').appendChild($button);
  $container.querySelector('.petvet-page__card-content.cuidados-especiais').appendChild($input);
}

PetVetPage.prototype = Object.assign(
  PetVetPage.prototype,
  Component.prototype,
);
