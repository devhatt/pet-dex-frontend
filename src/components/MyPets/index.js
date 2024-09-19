import { Component } from 'pet-dex-utilities';
import MyPetsCard from '../MyPetsCard';
import Sliding from '../Sliding';
import './index.scss';

const events = [''];

const html = `
  <div class="my-pets" data-select="my-pets">
  
  </div>
`;

export default function MyPets() {
  Component.call(this, { html, events });

  const $myPetsContainer = this.selected.get('my-pets');

  const myPetsCard = new MyPetsCard({
    name: 'Kelvo',
    race: 'Cachorro',
    type: 'Humano',
  });
  const div = document.createElement('div');
  myPetsCard.mount(div);

  const sliding = new Sliding({ slides: [div] });

  sliding.mount($myPetsContainer);
}

MyPets.prototype = Object.assign(MyPets.prototype, Component.prototype, {});
