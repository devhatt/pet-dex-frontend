import { Component } from 'pet-dex-utilities';
import arrow from '../../images/nav-button.svg';

import './index.scss';

const events = ['button:click'];

const html = `
    <button class="navigation-button" data-select="navigation-button">
        <img src="${arrow}" class="navigation-button__icon" data-select="button-icon"/>
    </button>
`;

export default function NavigationButton(state) {
  Component.call(this, { html, events });

  this.state = state;
  this.$navigationButton = this.selected.get('navigation-button');
  this.$buttonIcon = this.selected.get('button-icon');

  this.$buttonIcon.classList.toggle(
    'navigation-button__icon--next',
    this.state === 'next',
  );
  this.$navigationButton.setAttribute(
    'aria-label',
    this.state === 'next' ? 'Ir para o próximo mês' : 'Ir para o mês anterior',
  );

  this.emitEvent = () => {
    this.emit('button:click');
  };

  this.$navigationButton.addEventListener('click', this.emitEvent);
}

NavigationButton.prototype = Object.assign(
  NavigationButton.prototype,
  Component.prototype,
  {},
);
