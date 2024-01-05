import './index.scss';

import { Component } from 'pet-dex-utilities';

const html = `<div class="more-info__card">
                <div class="more-info__card-description">
                    <img data-select="more-info__icon" src="" alt="" class="more-info__icon">
                    <h3 data-select="more-info__title" class="more-info__card-title"></h3>
                </div>
                <div  data-select="input_checkbox" class="more-info__card-input-group">
                    <div class="more-info__card-checkbox-group">
                        <input data-select="checkbox__name1" type="radio" id="cuidados_False" name="">
                        <label class="label-check-radios" for="cuidados_False">
                            <span class="checkmark"></span>Não</label>
                    </div>
                    <div class="more-info__card-checkbox-group">
                        <input data-select="checkbox__name2" type="radio" id="cuidados_true" name="">
                        <label class="label-check-radios" for="cuidados_true">
                            <span class="checkmark"></span>Sim</label>
                    </div>
                </div>
                <div data-select="input_text" class="more-info__card-text-group">
                    <input data-select="input_placeholder" class="observation" type="text"
                        placeholder="">
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
        this.selected.get('input_placeholder').placeholder = text;
      }
    },
  });
}
