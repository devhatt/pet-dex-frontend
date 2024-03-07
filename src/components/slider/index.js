import { Component } from 'pet-dex-utilities';
import sizeSmall from './img/size-small.svg';
import sizeMedium from './img/size-medium.svg';
import sizeLarge from './img/size-large.svg';
import './index.scss';

const events = ['click', 'touchstart'];

const html = `
<div class="slider-wrapper" data-select="slider-wrapper">
  <ul class="slider-wrapper__slide" data-select="slider-wrapper__slide"> 
     <li role="checkbox" aria-checked="false" class="slider-wrapper__item" data-select="slider-small">     
      <img class="slider-wrapper__image" data-select="slider-wrapper__image" src="${sizeSmall}" alt="icon do tamanho pequeno do pet">
      <h3>Small</h3>
      <p>under 14kg</p>
     </li>
     <li role="checkbox" aria-checked="false" class="slider-wrapper__item active" data-select="slider-medium">
      <img class="slider-wrapper__image" src="${sizeMedium}" alt="icon do tamanho medio do pet">
      <h3>Medium</h3>
      <p>14-25kg</p>
     </li>
     <li role="checkbox" aria-checked="false" class="slider-wrapper__item" data-select="slider-large">
      <img class="slider-wrapper__image" da src="${sizeLarge}" alt="icon do tamanho grande do pet">
      <h3>Large</h3>
      <p>over 25kg</p>
     </li> 
  </ul> 
</div>
`;

export default function Slider(wrapper, slide) {
  Component.call(this, { html, events });

  const wrapperSlider = this.selected.get(wrapper);
  const slideItems = this.selected.get(slide);

  const childrens = [...slideItems.children];

  this.onStart(childrens);
}

Slider.prototype = Object.assign(Slider.prototype, Component.prototype, {
  onStart(childrens) {
    childrens.map((element) => {
      element.addEventListener('click', (event) => {
        if (element.classList.contains('active')) {
          this.ChangeImgActive(element);
          element.classList.add('active');
          event.target.setAttribute('aria-checked', 'true');
        } else {
          event.target.setAttribute('aria-checked', 'false');
          childrens.map((children) => {
            children.classList.remove('active');
            return children;
          });
          element.classList.add('active');
        }
        this.ChangeImgDefault(element);
      });
      return this;
    });
  },

  ChangeImgActive(element) {
    const item = element.children[0].attributes.src.value;

    if (item === '/components/slider/img/size-small.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-small-active.svg';
    } else if (item === '/components/slider/img/size-medium.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-medium-active.svg';
    } else if (item === '/components/slider/img/size-large.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-large-active.svg';
    }
  },

  ChangeImgDefault(element) {
    const item = element.children[0].attributes.src.value;

    if (item === '/components/slider/img/size-small-active.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-small.svg';
    } else if (item === '/components/slider/img/size-medium-active.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-medium.svg';
    } else if (item === '/components/slider/img/size-large-active.svg') {
      element.children[0].attributes.src.value =
        '/components/slider/img/size-large.svg';
    }
  },
});