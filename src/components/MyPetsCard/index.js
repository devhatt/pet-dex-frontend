import { Component } from 'pet-dex-utilities';
import PetAvatar from '../PetAvatar';

import akita from '../AddPet/assets/akita.svg';

import './index.scss';
import PetGender from '../PetGender';

const events = [''];

const html = `
  <div class="my-pets-card" data-select="my-pets-card">
    <div class="my-pets-card__text">
      <div data-select="icon-container"></div>
      <div>
        <span class="my-pets-card__pet-name" data-select="name"></span>
        <div class="my-pets-card__pet-info"/>
          <span data-select="race"></span>
          |
          <span data-select="type"></span>
        </div>
      </div>
      <p class="my-pets-card__pet-desc" data-select="desc">
      </p>
    </div>
    <div class="my-pets-card__avatar" data-select="avatar"/>
  </div>
`;

export default function MyPetsCard({
  name = '',
  type = '',
  race = '',
  desc = '',
  gender = 'male',
  avatar,
}) {
  Component.call(this, { html, events });

  this.insertText({ name, type, race, avatar, desc });

  const $iconContainer = this.selected.get('icon-container');

  const petGender = new PetGender({ gender });
  petGender.selected
    .get('pet-gender-icon')
    .classList.add('my-pets-card__pet-gender');

  petGender.mount($iconContainer);
}

MyPetsCard.prototype = Object.assign(
  MyPetsCard.prototype,
  Component.prototype,
  {
    insertText({ name, type, race, desc }) {
      const $name = this.selected.get('name');
      const $type = this.selected.get('type');
      const $race = this.selected.get('race');
      const $desc = this.selected.get('desc');
      const $avatar = this.selected.get('avatar');

      const petAvatar = new PetAvatar({
        imgAlt: 'breed alt description',
        imgSrc: akita,
      });
      petAvatar.mount($avatar);

      const $petAvatarImg = petAvatar.selected.get('pet-image');
      $petAvatarImg.classList.add('my-pets-card__pet-avatar-image');

      $name.textContent = name;
      $type.textContent = type;
      $race.textContent = race;
      $desc.textContent = desc;
    },
  },
);
