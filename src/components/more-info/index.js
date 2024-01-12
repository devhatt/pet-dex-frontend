import './index.scss';

import { Component } from 'pet-dex-utilities';
import InputText from '../TextInput/index';

const html = `
          <div  class="more-info-container">
              <div class="more-info-header">
                <h3 class="more-info-header__title">Conte-nos um pouco mais do seu animal</h3>
                <h4 class="more-info-header__sub-title">Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele!</h4>
              </div>
            <div class="more-info-card">
                <div class="more-info-card__description">
                    <img data-select="more-info__icon" src="" alt="" class="more-info-card__description__icon">
                    <h3 data-select="more-info__title" class="more-info-card__description__title"></h3>
                </div>
                <div data-select="input_checkbox" class="more-info-card__input-group">
                    <div class="more-info-card__input-group__checkbox-group">
                        <input data-select="checkbox__name1" type="radio" id="cuidados_False" name="">
                        <label class="label-check-radios" for="cuidados_False">
                            <span class="checkmark"></span>Não</label>
                    </div>
                    <div class="more-info-card__input-group__checkbox-group">
                        <input data-select="checkbox__name2" type="radio" id="cuidados_true" name="">
                        <label class="label-check-radios" for="cuidados_true">
                            <span class="checkmark"></span>Sim</label>
                    </div>
                </div>
                <div data-select="input_text" class="more-info__card-text-group">
                </div>
            </div>
          </div>`;

export default function CardPet() {
  Component.call(this, { html });

  CardPet.prototype = Object.assign(CardPet.prototype, Component.prototype, {
    setImage(text) {
      this.selected.get('more-info__icon').src = text;
    },
    setTitle(text) {
      this.selected.get('more-info__title').textContent = text;
    },
    setQuestion(text) {
      if (text === '' || null || undefined) {
        this.selected.get('input_checkbox').style.display = 'none';
      } else {
        this.selected.get('checkbox__name1').name = text;
        this.selected.get('checkbox__name2').name = text;
      }
    },
    setInputObservation(text) {
      if (text === '' || null || undefined) {
        this.selected.get('input_text').style.display = 'none';
      } else {
        const inputText = new InputText({
          placeholder: text,
          variation: 'outlined',
        });
        // eslint-disable-next-line no-console
        console.log(inputText);
        // eslint-disable-next-line prettier/prettier
        this.selected.get('input_text').appendChild(inputText);
      }
    },
  });
}
