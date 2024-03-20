import { Component } from 'pet-dex-utilities';
import sizeSmall from './img/size-small.svg';
import sizeMedium from './img/size-medium-active.svg';
import sizeLarge from './img/size-large.svg';
import './index.scss';

const events = ['click', 'touchstart'];

const html = `
<div class="selector-wrapper" data-select="selector-wrapper">
  <ul role="listbox" class="selector-wrapper__slide" data-select="selector-wrapper__slide"> 
     <li role="option" aria-label="small pet size" aria-selected="false" class="selector-wrapper__item" data-select="slider-small">     
      <img class="selector-wrapper__image" data-select="selector-wrapper__image" src="${sizeSmall}" alt="pet small size icon">
      <h3>Small</h3>
      <p>under 14kg</p>
     </li>
     <li role="option" aria-label="medium pet size" aria-selected="true" class="selector-wrapper__item active" data-select="slider-medium">
      <img class="selector-wrapper__image" src="${sizeMedium}" alt="pet medium size icon">
      <h3>Medium</h3>
      <p>14-25kg</p>
     </li>
     <li role="option" aria-label="large pet size" aria-selected="false" class="selector-wrapper__item" data-select="slider-large">
      <img class="selector-wrapper__image" da src="${sizeLarge}" alt="pet large size icon">
      <h3>Large</h3>
      <p>over 25kg</p>
     </li> 
  </ul> 
</div>
`;

export default function SizeSelector(slide) {
  Component.call(this, { html, events });

  const slideItems = this.selected.get(slide);

  const childrens = [...slideItems.children];
  this.startEvents(childrens);
}

SizeSelector.prototype = Object.assign(
  SizeSelector.prototype,
  Component.prototype,
  {
    startEvents(childrens) {
      childrens.map((element) => {
        element.addEventListener('pointerdown', () => {
          this.changeToDefault(childrens);
          if (element.classList.contains('active')) {
            element.classList.add('active');
          } else {
            childrens.map((children) => {
              children.classList.remove('active');
              return children;
            });
            element.classList.add('active');
          }
          this.changeToActive(element);
        });
        return this;
      });
    },

    changeToDefault(childrens) {
      childrens.map((element) => {
        const srcValue = element.children[0].attributes.src.value;
        const itemSrc = element.children[0].attributes.src;

        if (srcValue === '/components/SizeSelector/img/size-small-active.svg') {
          itemSrc.value = '/components/SizeSelector/img/size-small.svg';
          element.setAttribute('aria-selected', 'false');
        } else if (
          srcValue === '/components/SizeSelector/img/size-medium-active.svg'
        ) {
          itemSrc.value = '/components/SizeSelector/img/size-medium.svg';
          element.setAttribute('aria-selected', 'false');
        } else if (
          srcValue === '/components/SizeSelector/img/size-large-active.svg'
        ) {
          itemSrc.value = '/components/SizeSelector/img/size-large.svg';
          element.setAttribute('aria-selected', 'false');
        }
        return srcValue;
      });
    },

    changeToActive(element) {
      const srcValue = element.children[0].attributes.src.value;
      const itemSrc = element.children[0].attributes.src;

      if (srcValue === '/components/SizeSelector/img/size-small.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-small-active.svg';
        element.setAttribute('aria-selected', 'true');
      } else if (srcValue === '/components/SizeSelector/img/size-medium.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-medium-active.svg';
        element.setAttribute('aria-selected', 'true');
      } else if (srcValue === '/components/SizeSelector/img/size-large.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-large-active.svg';
        element.setAttribute('aria-selected', 'true');
      }
    },
  },
);
