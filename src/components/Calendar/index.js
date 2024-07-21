import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `

`;

export default function Calendar() {
  Component.call(this, { html, events });
}

Calendar.prototype = Object.assign(Calendar.prototype, Component.prototype, {});
