import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import RangeSlider from '../../../components/RangeSlider';
import './index.scss';

const html = `
  <div data-select="container" class="no-pet-regirested-page" style="width: 100%;">
    <div class="no-pet-regirested-page__content" style="width: 100%;"></div>
  </div>;
`;

export default function NoPetRegirestedPage() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.button = new Button({
    text: 'Cadastrar pet',
    isFullWidth: true,
  });

  this.button.selected
    .get('button')
    .classList.add('no-pet-regirested-page__button');
  this.button.mount($container);

  const rangeSlider = new RangeSlider(0, 100);
  const contentElement = $container.querySelector('.no-pet-regirested-page__content');

  rangeSlider.mount(contentElement);
}

NoPetRegirestedPage.prototype = Object.assign(
  NoPetRegirestedPage.prototype,
  Component.prototype,
);
