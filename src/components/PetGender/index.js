import { Component } from 'pet-dex-utilities';
import female from './images/femaleIcon.svg';
import male from './images/maleIcon.svg';

const events = [''];

const html = `
    <img class="pet-gender__img" data-select="pet-gender-icon"/>
`;

export default function PetGender({ gender = 'male' }) {
  Component.call(this, { html, events });

  if (gender === 'male') this.setGender('male');
  if (gender === 'female') this.setGender('female');
}

PetGender.prototype = Object.assign(PetGender.prototype, Component.prototype, {
  getGender() {},
  setGender(gender) {
    const icon = this.selected.get('pet-gender-icon');

    if (gender === 'male') {
      icon.src = male;
    }
    if (gender === 'female') {
      icon.src = female;
    }
  },
});
