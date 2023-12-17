import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
    <div class="side-menu"></div>
`;

export default function SideMenu() {
  Component.call(this, { html, events });
}

SideMenu.prototype = Object.assign(SideMenu.prototype, Component.prototype);
