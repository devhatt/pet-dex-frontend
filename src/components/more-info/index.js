import './index.scss';

import { Component } from 'pet-dex-utilities';
import InputText from '../TextInput/index';

const mockVaccines = [
  {
    year: 2023,
    vaccine: 'Antirrábica',
    date: '11-02-2023',
    doctor: 'Felipa',
  },
  {
    year: 2023,
    vaccine: 'Raiva',
    date: '11-02-2023',
    doctor: 'Felipa',
  },
  {
    year: 2023,
    vaccine: 'Leptospirose',
    date: '12-03-2023',
    doctor: 'Felipa',
  },
  {
    year: 2023,
    vaccine: 'Bordetella',
    date: '15-04-2023',
    doctor: 'Felipa',
  },
  {
    year: 2023,
    vaccine: 'Giardia',
    date: '06-10-2023',
    doctor: 'Felipa',
  },
];

const html = `
          <div  class="more-info-container">
              <div class="more-info-header">
                <h3 class="more-info-header__title">Conte-nos um pouco mais do seu animal</h3>
                <h4 class="more-info-header__sub-title">Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele!</h4>
              </div>
            <div class="more-info-card">
                <div class="more-info-card__description">
                    <img src="../components/more-info/assets/stethoscope.svg" alt="stethoscope" class="more-info-card__description__icon">
                    <h3 class="more-info-card__description__title">O seu pet amigo foi castrado?</h3>
                </div>
                <div class="more-info-card__input-group">
                    <div class="more-info-card__input-group__checkbox-group">
                        <input type="radio" id="castrado_false" name="castrado">
                        <label class="label-check-radios" for="castrado_false">
                            <span class="checkmark"></span>Não</label>
                    </div>
                    <div class="more-info-card__input-group__checkbox-group">
                        <input type="radio" id="castrado_true" name="castrado">
                        <label class="label-check-radios" for="castrado_true">
                            <span class="checkmark"></span>Sim</label>
                    </div>
                </div>
            </div>
            <div class="more-info-card">
                <div class="more-info-card__description">
                    <img src="../components/more-info/assets/shield.svg" alt="shield" class="more-info-card__description__icon">
                    <h3 class="more-info-card__description__title">Cuidados especiais</h3>
                </div>
                <div class="more-info-card__input-group">
                    <div class="more-info-card__input-group__checkbox-group">
                        <input type="radio" id="cuidados_False" name="cuidados">
                        <label class="label-check-radios" for="cuidados_False">
                            <span class="checkmark"></span>Não</label>
                    </div>
                    <div class="more-info-card__input-group__checkbox-group">
                        <input type="radio" id="cuidados_true" name="cuidados">
                        <label class="label-check-radios" for="cuidados_true">
                            <span class="checkmark"></span>Sim</label>
                    </div>
                </div>
                <label class="label-cuidado">Escreva o cuidado especial</label>
                <div data-select="input_text" class="more-info__card-text-group">
                </div>
            </div>
            <div class="more-info-card">
                <div class="more-info-card__description">
                    <img src="../components/more-info/assets/vaccine.svg" alt="vaccine" class="more-info-card__description__icon">
                    <h3 class="more-info-card__description__title">Vacinas</h3>
                </div>
                <div class="more-info-card__input-group">
                  <button class='button_add'>
                  <img src="../components/more-info/assets/plus.svg" alt="plus" class="more-info-card__description__icon">
                  Adicionar
                  </button>
                </div>
            </div>
            <div data-select="render-vaccines" class="render-vaccines">
            </div>
          </div>`;

export default function CardPet() {
  Component.call(this, { html });
  const inputText = new InputText({
    placeholder: 'Escreva o cuidado especial',
    variation: 'outlined',
  });
  const inputContainer = this.selected.get('input_text');

  inputText.mount(inputContainer);

  if (!mockVaccines) {
    // eslint-disable-next-line prettier/prettier
    this.selected.get('render-vaccines').innerText = 'Nenhuma vacina cadastrada.';
  } else {
    // eslint-disable-next-line no-inner-declarations
    function cardVaccine(year, vaccine, date, doctor) {
      const cardVaccineHtml = `
    <p class="vaccines-container__year">${year}</p>
    <div class="vaccines-group">
    <p class="vaccines-group__title">${vaccine}</p>
    <div class="vaccines-group__date-group">
    <img src="../components/more-info/assets/calendar.svg" alt="calendar" class="vaccines-group__date-group__icon">
    <p class="vaccines-group__date-group__date">${date}</p>
    </div>
    <p  class="vaccines-group__doctor">Dr. ${doctor}</p></div>`;
      return cardVaccineHtml;
    }
    const vaccinesContainer = this.selected.get('render-vaccines');
    const dataVaccines = () => {
      //preciso de ajuda para não precisar desabilitar a regra
      // eslint-disable-next-line no-restricted-syntax
      for (const item of mockVaccines) {
        //preciso de ajuda para não precisar desabilitar a regra
        // eslint-disable-next-line prettier/prettier
        const createCardVaccine = cardVaccine(item.year, item.vaccine, item.date, item.doctor);
        const divVaccines = document.createElement('div');
        divVaccines.classList.add('vaccines-container');
        divVaccines.innerHTML = createCardVaccine;
        vaccinesContainer.appendChild(divVaccines);
      }
    };
    dataVaccines();
  }
}

CardPet.prototype = Object.assign(CardPet.prototype, Component.prototype);
