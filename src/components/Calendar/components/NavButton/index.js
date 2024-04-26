import { Component } from 'pet-dex-utilities';
import './index.scss';
import navButton from '../../images/navButton.svg';

const events = ['prev', 'next'];

const html = `
  <button data-select="nav-button" class="nav-button" type="button"><img src="${navButton}" alt="arrow icon"></button>
`;

export default function NavButton(position) {
  Component.call(this, { html, events });

  this.$navButton = this.selected.get('nav-button');
  this.$navButton.classList.add(position);
  const isPrev = this.$navButton.classList.contains('prev');
  this.$navButton.setAttribute(
    'aria-label',
    isPrev ? 'Ir para o mês anterior' : 'Ir para o próximo mês',
  );

  const navButtonClickHandle = () => {
    if (isPrev) {
      this.emit('prev');
    } else {
      this.emit('next');
    }
  };
  this.$navButton.addEventListener('click', navButtonClickHandle);
}

NavButton.prototype = Object.assign(
  NavButton.prototype,
  Component.prototype,
  {},
);
