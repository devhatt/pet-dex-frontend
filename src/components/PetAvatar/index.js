import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['active', 'deactive'];

const html = `
  <a class="pet-container" data-select="pet-container" href="/petprofile/">
    <img class="pet-container__img" data-select="pet-image" src="" alt=""/>
    <p class="pet-container__title" data-select="pet-title"></p>
  </a>
`;

// estudar frontend route / route parameter

export default function PetAvatar({ id, title, imgSrc, imgAlt }) {
  Component.call(this, { html, events });

  this.selected.get('pet-container').href += id;

  if (title) this.setTitle(title);
  if (imgSrc) this.setImgSrc(imgSrc);
  if (imgAlt) this.setImgAlt(imgAlt);
}

PetAvatar.prototype = Object.assign(PetAvatar.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('pet-title').textContent = text;
  },
  setImgSrc(src) {
    this.selected.get('pet-image').src = src;
  },
  setImgAlt(alt) {
    this.selected.get('pet-image').alt = alt;
  },
  isActive() {},
  activate() {
    const image = this.selected.get('pet-image');
    const title = this.selected.get('pet-title');
    image.classList.add('pet-container__img--active');
    title.classList.add('pet-container__title--active');
    this.emit('active');
  },
  deactivate() {
    const image = this.selected.get('pet-image');
    const title = this.selected.get('pet-title');
    image.classList.remove('pet-container__img--active');
    title.classList.remove('pet-container__title--active');
    this.emit('deactive');
  },
});
