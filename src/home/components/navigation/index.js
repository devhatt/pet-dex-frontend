import { Component } from 'pet-dex-utilities';
import './index.scss';

const html = `
  <div class="navigation">
    <figure>
      <img class="navigation__logo" src="/pet-dex.svg" alt="pet-dex logo" />
    </figure>
    <div class="navigation__icons">
      <figure class="navigation__icon-container navigation__icon-container--menu">
        <img class="navigation__icon" src="/menu.svg" alt="menu" />
      </figure>
      <figure class="navigation__icon-container navigation__icon-container--bell">
        <img class="navigation__icon" src="/sin.svg" alt="notifications" />
      </figure>
      <figure class="navigation__icon-container navigation__icon-container--avatar">
        <img class="navigation__icon" src="/avatar.svg" alt="user avatar" />
      </figure>
      <figure class="navigation__icon-container navigation__icon-container--exit">
        <img class="navigation__icon" src="/exit.svg" alt="exit button" />
      </figure>
    </div>
  </div>
`;

export default function Navigation() {
  Component.call(this, { html });
}

Navigation.prototype = Object.assign(Navigation.prototype, Component.prototype);
