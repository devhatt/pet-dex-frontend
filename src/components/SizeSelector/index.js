import { Component } from 'pet-dex-utilities';
import sizeSmall from './images/size-small.svg';
import sizeMedium from './images/size-medium.svg';
import sizeLarge from './images/size-large.svg';
import './index.scss';

const events = ['click', 'touchstart'];

const html = `
<div class="selector-wrapper" data-select="selector-wrapper">
  <ul role="listbox" class="selector-wrapper__slide" data-select="selector-wrapper__slide"> 
     <li role="option" aria-label="small pet size" aria-selected="false" class="selector-wrapper__item" data-select="slider-small">     
      <img class="selector-wrapper__image" src="${sizeSmall}" alt="pet small size icon">
      <h3 class="selector-wrapper__title">Small</h3>
      <p class="selector-wrapper__weight">under 14kg</p>
     </li>
     <li role="option" aria-label="medium pet size" aria-selected="true" class="selector-wrapper__item" data-select="slider-medium">
      <img class="selector-wrapper__image" src="${sizeMedium}" alt="pet medium size icon">
      <h3 class="selector-wrapper__title">Medium</h3>
      <p class="selector-wrapper__weight">14-25kg</p>
     </li>
     <li role="option" aria-label="large pet size" aria-selected="false" class="selector-wrapper__item" data-select="slider-large">
      <img class="selector-wrapper__image" da src="${sizeLarge}" alt="pet large size icon">
      <h3 class="selector-wrapper__title">Large</h3>
      <p class="selector-wrapper__weight">over 25kg</p>
     </li> 
  </ul> 
</div>
`;

function classRemover(children) {
  [...children].forEach((element) => {
    element.classList.remove('selector-wrapper__item--active');
  });
}

function changeToDefault(children) {
  [...children].forEach((element) => {
    const srcValue = element.children[0].attributes.src.value;
    const itemSrc = element.children[0].attributes.src;

    const srcMappings = {
      '/components/SizeSelector/images/size-small-active.svg':
        '/components/SizeSelector/images/size-small.svg',
      '/components/SizeSelector/images/size-medium-active.svg':
        '/components/SizeSelector/images/size-medium.svg',
      '/components/SizeSelector/images/size-large-active.svg':
        '/components/SizeSelector/images/size-large.svg',
    };

    const newValue = srcMappings[srcValue];

    if (newValue) {
      element.classList.remove('selector-wrapper__item--active');
      element.setAttribute('aria-selected', 'false');

      itemSrc.value = newValue;
    }
  });
}

function changeToActive(element) {
  const srcValue = element.children[0].attributes.src.value;
  const itemSrc = element.children[0].attributes.src;

  const srcMappings = {
    '/components/SizeSelector/images/size-small.svg':
      '/components/SizeSelector/images/size-small-active.svg',
    '/components/SizeSelector/images/size-medium.svg':
      '/components/SizeSelector/images/size-medium-active.svg',
    '/components/SizeSelector/images/size-large.svg':
      '/components/SizeSelector/images/size-large-active.svg',
  };

  const newValue = srcMappings[srcValue];

  if (newValue) {
    element.classList.add('selector-wrapper__item--active');
    element.setAttribute('aria-selected', 'true');

    itemSrc.value = newValue;
  }
}

function checkingTheElement(children) {
  children.forEach((element) => {
    element.addEventListener('click', () => {
      const elementState = element.classList.contains(
        'selector-wrapper__item--active',
      );
      changeToDefault(children);
      if (elementState) {
        changeToDefault(children);
      } else {
        changeToActive(element);
      }
    });
  });
}

export default function SizeSelector({ slide }) {
  Component.call(this, { html, events });

  const slideItems = this.selected.get(slide);
  const children = [...slideItems.children];

  classRemover(children);
  changeToDefault(children);
  checkingTheElement(children);
}

SizeSelector.prototype = Object.assign(
  SizeSelector.prototype,
  Component.prototype,
  {},
);
