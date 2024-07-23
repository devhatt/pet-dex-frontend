import { Component } from 'pet-dex-utilities';
import './index.scss';
import PetVetPage from '../../layouts/app/pages/PetVet';
import PetWeight from '../../layouts/app/pages/PetWeight';
import PetRegister from '../../layouts/app/pages/PetRegister';
import arrowLeft from './assets/arrow-left.svg';
import akita from './assets/akita.svg';
import Sliding from '../Sliding';
import ProgressBar from '../ProgressBar';

const cards = [
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
];

const events = [];

const html = `
  <div class="add-pet" data-select="add-pet-content">
    <div class="add-pet__header" data-select="add-pet-header">
      <div class="add-pet__content">
        <img src=${arrowLeft} alt="previous step" class="add-pet__previous-step" data-select="previous-step"/>
        <div class="add-pet__text">
          <p class="add-pet__title">Petperfil</p>
          <p class="add-pet__subtitle">Petraça</p>
        </div>
        <div>
          <p>Pata</p>
          <p class="add-pet__steps" data-select="steps">1/3</p>
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
  this.$steps = this.selected.get('steps');

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
  updateStep(actualStep, endingStep) {
    this.actualStep = actualStep;
    this.$steps.textContent = `${actualStep}/${endingStep}`;
  },
  nextStep(actualStep, endingStep) {
    this.sliding.next();
    this.progressBar.next();
    this.updateStep(actualStep + 1, endingStep);
  },
  backStep(actualStep, endingStep) {
    if (this.sliding.slideIndex >= 1) {
      this.sliding.previous();
      this.progressBar.prev();
      this.updateStep(actualStep - 1, endingStep);
    }
  },
});
