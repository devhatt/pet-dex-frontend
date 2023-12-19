import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['active'];

const html = `
<div class="pet-container" data-select="pet-container" id="">
    <div>
        <p class="pet-container__title" data-select="pet-title"></p>
    </div>
    <div>
        <img class="pet-container__image" data-select="pet-image" src="https://png.pngtree.com/png-clipart/20230506/original/pngtree-smiling-dogs-with-happy-expressions-png-image_9144389.png" alt="">
    </div>
</div>
`;

export default function PetCard() {
  Component.call(this, { html, events });

  const petContainer = this.selected.get('pet-container');

  petContainer.addEventListener('click', () => {
    this.toggle();
    this.active();
  });
}

PetCard.prototype = Object.assign(PetCard.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('pet-title').textContent = text;
  },
  toggle() {
    const petContainer = this.selected.get('pet-container');
    petContainer.classList.add('pet-container--active');
  },
  active() {
    this.emit('active');
  },
});
