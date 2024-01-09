import { Component } from 'pet-dex-utilities';
import './index.scss';

const html = `
  <div class="side-menu">
    <figure class="side-menu__logo-container">
      <img class="side-menu__logo" src="/pet-dex.svg" alt="pet-dex logo" />
    </figure>
  </div>
`;

export default function SideMenu() {
  Component.call(this, { html });
}

SideMenu.prototype = Object.assign(SideMenu.prototype, Component.prototype);
