import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'click', 'removed', 'added'];

const html = `
  <div class="tabber-container" data-select="tabber-container">
    <div class="tabber-tab" data-select="tabber-tabs"></div>
    <div class="tabber-content" data-select="tabber-content"></div>
  </div>
`;

export default function Tabber({ tabs }) {
  Component.call(this, { html, events });

  tabs.forEach((tab, index) => {
    const { tabButton } = this.addTab(tab, index);
    tabButton.addEventListener('click', () => {
      this.activateTab(index);
      this.emit('change', index);
    });
  });

  this.listen('mount', () => {
    this.activateTab(0);
  });
}

Tabber.prototype = Object.assign(Tabber.prototype, Component.prototype, {
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
  activateTab(index) {
    const tabButton = this.getTab(index);
    const tabContent = this.getContent(index);
    if (!tabButton) return;

    const tabsContainer = this.selected
      .get('tabber-tabs')
      .querySelectorAll('button');
    const contentContainer = this.selected
      .get('tabber-content')
      .querySelectorAll('div');

    contentContainer.forEach((content) => content.classList.add('hide'));
    tabsContainer.forEach((tab) =>
      tab.classList.remove('tabber-button--active'),
    );

    tabButton.classList.add('tabber-button--active');
    tabContent.classList.remove('hide');
  },
  removeTab(index) {
    const tabButton = this.getTab(index);
    const tabContent = this.getContent(index);
    if (!tabButton) return;

    tabButton.remove();
    tabContent.remove();
  },
  addTab(tab) {
    const tabsContainer = this.selected.get('tabber-tabs');
    const contentContainer = this.selected.get('tabber-content');

    const index = tabsContainer.children.length;
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

    tabButton.addEventListener('click', () => {
      this.activateTab(index);
      this.emit('change', index);
    });

    return { tabButton, tabContent };
  },
});
