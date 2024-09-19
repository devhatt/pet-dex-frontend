import { Component } from 'pet-dex-utilities';
import PetAvatar from '../PetAvatar';

import akita from '../AddPet/assets/akita.svg';

import './index.scss';

const events = [''];

const html = `
  <div class="my-pets-card" data-select="my-pets-card">
    <div class="my-pets-card__text">
      <span class="my-pets-card__pet-name" data-select="my-pets-card-name"></span>
      <div class="my-pets-card__pet-info"/>
        <span data-select="my-pets-card-race"></span>
        |
        <span data-select="my-pets-card-type"></span>
      </div>
    </div>
    <div data-select="my-pets-card-avatar">
    </div>
  </div>
`;

export default function MyPetsCard({
  name = '',
  type = '',
  race = '',
  avatar,
}) {
  Component.call(this, { html, events });

  this.insertText({ name, type, race, avatar });
}

MyPetsCard.prototype = Object.assign(
  MyPetsCard.prototype,
  Component.prototype,
  {
    insertText({ name, type, race }) {
      const $name = this.selected.get('my-pets-card-name');
      const $type = this.selected.get('my-pets-card-type');
      const $race = this.selected.get('my-pets-card-race');
      const $avatar = this.selected.get('my-pets-card-avatar');

      const petAvatar = new PetAvatar({
        imgAlt: 'breed alt description',
        imgSrc: akita,
      });
      const $petAvatarDiv = document.createElement('div');
      petAvatar.mount($petAvatarDiv);

      $name.textContent = name;
      $type.textContent = type;
      $race.textContent = race;
      $avatar.appendChild($petAvatarDiv);
    },
  },
);
