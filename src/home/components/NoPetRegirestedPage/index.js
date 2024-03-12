import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import Tabber from '../../../components/Tabber';
import iconHome from '../../../stories/assets/tabber/home.svg';
import './index.scss';

const html = `
  <div data-select="container" class="no-pet-regirested-page">
    <div class="no-pet-regirested-page__content">
    </div>
  </div>;
`;

export default function NoPetRegirestedPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  const button = new Button({
    text: 'Cadastrar pet',
    isFullWidth: true,
    isDisabled: false,
  });

  const tabs = [
    { title: 'Aba 1', icon: iconHome, content: 'Conteúdo da aba 1' },
    { title: 'Aba 2', content: 'Conteúdo da aba 2' },
    { title: 'Aba 3', content: button },
    { title: 'Aba 4', content: 'Conteúdo da aba 4' },
  ];

  const tabber = new Tabber({ tabs });
  tabber.mount($container);

  const newTab = { title: 'Nova Aba', content: 'Conteúdo da nova aba' };
  tabber.addTab(newTab);

  setTimeout(() => {
    tabber.removeTab(1);
  }, 5000);
}

NoPetRegirestedPage.prototype = Object.assign(
  NoPetRegirestedPage.prototype,
  Component.prototype,
);
