import Component from '../component.js';
import html from './index.html?raw';
import './index.scss';	

const events = ['purchase'];

export default function Card() {
  Component.call(this, { html, events });
  this.enable = true;

  this.selected.get('card-button').addEventListener('click', () => {
    if (!this.enable) return;
    this.purchase();
    console.log('purchase padrao do componente');
  })
}

Card.prototype = Object.assign(Card.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('card-title').textContent = text;
  },
  purchase() {
    this.emit('purchase');
  },
  disable() {
    this.enable = false;
  },
});
