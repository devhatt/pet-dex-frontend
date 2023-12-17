import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
    <div class="navigation">
        <div>
            <img class="navigation__logo" src="assets/pet-dex.svg" alt="pet-dex logo" />
        </div>
        <div class="navigation__icons">
            <div class="navigation__icon-container navigation__icon-container--mobile">
                <img class="navigation__icon navigation__icon" src="/menu.svg" alt="menu" />
            </div>
            <div class="navigation__icon-container navigation__icon-container--desktop">
                <img class="navigation__icon" src="/sin.svg" alt="notifications" />
            </div>
            <div class="navigation__icon-container navigation__icon-container--desktop">
                <img class="navigation__icon" src="/avatar.svg" alt="user avatar" />
            </div>
            <div class="navigation__icon-container navigation__icon-container--desktop">
                <img class="navigation__icon" src="/exit.svg" alt="exit button" />
            </div>
        </div>
    </div>
`;

export default function Navigation() {
  Component.call(this, { html, events });
}

Navigation.prototype = Object.assign(Navigation.prototype, Component.prototype);
