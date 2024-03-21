import { Component } from 'pet-dex-utilities';
import './index.scss';

import cross from './images/cross.svg';

const html = `
<div class="avatar-button">
  <a href="#" class="avatar-button__container" data-select="avatar-button" title="Adicionar amigo">
    <div class="avatar-button__bg">
      <img class="avatar-button__cross" src="${cross}" alt="cross"/>
    </div>
    <div class="avatar-button__text">Adicionar amigo</div>
  </a>
</div>
`;

export default function AvatarButton() {
  Component.call(this, { html });
}

AvatarButton.prototype = Object.assign(
  AvatarButton.prototype,
  Component.prototype,
);
