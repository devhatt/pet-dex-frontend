import { Component } from 'pet-dex-utilities';

import PetRegister from '~layouts/pages/PetRegister';
import PetVetPage from '~layouts/pages/PetVet';
import PetWeight from '~layouts/pages/PetWeight';
import ProgressBar from '../ProgressBar';
import Sliding from '../Sliding';

import arrowLeft from './assets/arrow-left.svg';

import afghanHound from '../../stories/assets/petRegisterPage/afghanHound.svg';
import akita from '../../stories/assets/petRegisterPage/akita.svg';
import beagle from '../../stories/assets/petRegisterPage/beagle.svg';
import bichonFrise from '../../stories/assets/petRegisterPage/bichonFrise.svg';
import borderCollie from '../../stories/assets/petRegisterPage/borderCollie.svg';
import boxer from '../../stories/assets/petRegisterPage/boxer.svg';
import chowChow from '../../stories/assets/petRegisterPage/chowChow.svg';
import mixedBreed from '../../stories/assets/petRegisterPage/mixedBreed.svg';

import './index.scss';

const cards = [
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Beagle',
    imgSrc: beagle,
    imgAlt: 'beagle',
  },
  {
    title: 'Afghan Hound',
    imgSrc: afghanHound,
    imgAlt: 'afghan hound',
  },
  {
    title: 'Bichon Frise',
    imgSrc: bichonFrise,
    imgAlt: 'bichon frise',
  },
  {
    title: 'Chow Chow',
    imgSrc: chowChow,
    imgAlt: 'chow chow',
  },
  {
    title: 'Border Collie',
    imgSrc: borderCollie,
    imgAlt: 'border collie',
  },
  {
    title: 'Mixed Breed',
    imgSrc: mixedBreed,
    imgAlt: 'mixed breed',
  },
];

const steps = new Map();
steps.set(1, 'Petraça');
steps.set(2, 'Nome');
steps.set(3, 'Peso');

const events = [];

const html = `
  <div class="add-pet" data-select="add-pet-content">
    <div class="add-pet__header" data-select="add-pet-header">
      <div class="add-pet__content">
        <img src=${arrowLeft} alt="previous step" class="add-pet__previous-step" data-select="previous-step"/>
        <div class="add-pet__text">
          <p class="add-pet__title">Petperfil</p>
          <p class="add-pet__subtitle" data-select="step-name">Petraça</p>
        </div>
        <div class="steps-group">
          <p class="add-pet__step">Pata</p>
          <div class="add-pet__steps">
            <p class="add-pet__steps--first" data-select="first-step">1</p>
            <span>/</span>
            <p class="add-pet__steps--last" data-select="last-step">${steps.size}<p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export default function AddPet() {
  Component.call(this, { html, events });

  const petRegister = new PetRegister({ cards });
  const petWeight = new PetWeight({});
  const petVetPage = new PetVetPage({});

  const pages = [petRegister, petWeight, petVetPage];

  const $addPetHeader = this.selected.get('add-pet-header');
  const $addPetContent = this.selected.get('add-pet-content');
  const $previousStep = this.selected.get('previous-step');
  this.$stepsName = this.selected.get('step-name');
  this.$firstStep = this.selected.get('first-step');

  this.progressBar = new ProgressBar(1, pages.length, 1);
  this.progressBar.selected
    .get('progress-bar')
    .classList.add('add-pet__progress-bar');
  this.progressBar.mount($addPetHeader);

  this.slides = [];
  this.actualStep = 1;

  pages.forEach((page) => {
    const $div = document.createElement('div');
    page.mount($div);
    page.listen('submit', (submitForm) => {
      this.form = { ...this.form, ...submitForm };
      this.nextStep(this.actualStep, this.slides.length);
    });
    this.slides.push($div);
  });

  this.sliding = new Sliding({ slides: this.slides });
  this.sliding.mount($addPetContent);

  $previousStep.onclick = () => {
    this.backStep(this.actualStep, this.slides.length);
  };
}

AddPet.prototype = Object.assign(AddPet.prototype, Component.prototype, {
  updateStep(actualStep) {
    this.actualStep = actualStep;
    this.$stepsName = steps.get(actualStep);
    this.$firstStep.textContent = actualStep;
  },
  nextStep(actualStep) {
    this.sliding.next();
    this.progressBar.next();
    this.updateStep(actualStep + 1);
  },
  backStep(actualStep) {
    if (this.sliding.slideIndex >= 1) {
      this.sliding.previous();
      this.progressBar.prev();
      this.updateStep(actualStep - 1);
    }
  },
});
