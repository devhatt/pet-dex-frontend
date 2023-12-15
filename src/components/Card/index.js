import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['purchase'];

const html = `
  <div class="card-container">
    <img class="card-container__image" data-select="card-image" src="" alt="">
    <strong class="card-container__title" data-select="card-title"></strong>
    <button class="card-container__button" data-select="card-button" type="button">Comprar</button>
  </div>
`;

export default function Card() {
  Component.call(this, { html, events });
  this.enable = true;

  this.selected.get('card-button').addEventListener('click', () => {
    if (!this.enable) return;
    this.purchase();
    console.log('purchase padrao do componente');
  });
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
