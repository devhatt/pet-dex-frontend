import { Component } from 'pet-dex-utilities';
import './index.scss';
import icon from './Icon.svg';
import iconHover from './iconHover.svg';

const html = `
  <a href="#" class="avatarButton" data-select="container">
    <img class="plus" data-select="image" src="${icon}" alt="" />
  </a>
`;

export default function AvatarButton() {
  Component.call(this, { html });

  const $image = this.selected.get('image');
  const imageOriginal = icon;
  const imageHover = iconHover;

  $image.addEventListener('mouseover', () => ($image.src = imageHover));
  $image.addEventListener('mouseout', () => ($image.src = imageOriginal));
}

AvatarButton.prototype = Object.assign(
  AvatarButton.prototype,
  Component.prototype
);
