import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'click'];

const html = `
  <div class="tabber-container" data-select="tabber-container">
    <div class="tabber-tab" data-select="tabber-tabs"></div>
    <div class="tabber-content" data-select="tabber-content"></div>
  </div>
`;
// todo, emitir eventos ao desativar >> talvez manter registro da aba q estava ativa antes
export default function Tabber({ tabs }) {
  Component.call(this, { html, events });

  const tabsContainer = this.selected.get('tabber-tabs');
  const contentContainer = this.selected.get('tabber-content');

  tabs.forEach((tab, index) => {
    const tabButton = document.createElement('button');
    tabButton.textContent = tab.title;
    tabButton.dataset.index = index;
    tabButton.classList.add('tabber-button');
    tabsContainer.appendChild(tabButton);

    const tabContent = document.createElement('div');
    tabContent.dataset.index = index;
    if (typeof tab.content.mount === 'function') {
      tab.content.mount(tabContent);
    } else {
      tabContent.textContent = tab.content;
    }
    tabContent.classList.add('hide');
    contentContainer.appendChild(tabContent);
  });

  const tabButtons = tabsContainer.querySelectorAll('button');

  tabButtons.forEach((tabButton) =>
    tabButton.addEventListener('click', () => {
      const index = parseInt(tabButton.dataset.index, 10);

      this.activateTab(index);

      this.emit('change', index);
    }),
  );

  this.listen('mount', () => {
    this.activateTab(0);
  });
}

Tabber.prototype = Object.assign(Tabber.prototype, Component.prototype, {
  activateTab(index) {
    const tabButton = this.getTab(index);
    if (!tabButton) return;

    const tabsContainer = this.selected.get('tabber-tabs');
    const contentContainer = this.selected
      .get('tabber-content')
      .querySelectorAll('div');

    contentContainer.forEach((content) => content.classList.add('hide'));
    tabsContainer
      .querySelectorAll('button')
      .forEach((tab) => tab.classList.remove('tabber-button--active'));

    const tabContent = this.getContent(index);
    tabContent.classList.remove('hide');
    tabButton.classList.add('tabber-button--active');
  },
  getTab(index) {
    return this.selected
      .get('tabber-tabs')
      .querySelector(`button[data-index="${index}"]`);
  },
  getContent(index) {
    return this.selected
      .get('tabber-content')
      .querySelector(`div[data-index="${index}"]`);
  },
  getCurrentTab() {
    return this.selected
      .get('tabber-tabs')
      .querySelector('.tabber-button--active');
  },
});
// add- remove tab
