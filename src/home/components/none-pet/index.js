import { Component } from 'pet-dex-utilities';
import Button from '../../../components/button';
import './index.scss';

const events = [];

const html = `
    <div data-select="container" class="none-pet">
        <div class="none-pet__content">
          <div class="none-pet__description">
            <h1 class="none-pet__title">Você ainda não tem nenhum pet cadastrado</h1>
            <p class="none-pet__hint">Crie o perfil do seu pet e deixe o nosso site com o focinho do seu filhote!</p>
          </div>
          <img class="none-pet__image" src="/none-pet.png" alt="dog in an smart phone" />
        </div>
    </div>;
`;

export default function NonePet() {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');

  this.button = new Button();
  this.button.setIsBlock(true);
  this.button.setText('Cadastrar pet');
  this.button.selected.get('button').classList.add('none-pet__button');
  this.button.mount($container);
}

NonePet.prototype = Object.assign(NonePet.prototype, Component.prototype);
