import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['tabChange', 'click'];

const html = `
<div class="tabber-container" data-select="tabber-container">
  <div class="tabber-tab" data-select="tabber-tabs"></div>
  <div class="tabber-content" data-select="tabber-content"></div>
</div>
`;

export default function Tabber({ tabs }) {
  Component.call(this, { html, events });

  const container = this.selected.get('tabber-container');
  const tabsContainer = container.querySelector('[data-select="tabber-tabs"]');
  const contentContainer = container.querySelector('[data-select="tabber-content"]');

  tabs.forEach((tab, index) => {
    const tabButton = document.createElement('button');
    tabButton.textContent = tab.title;
    tabButton.dataset.index = index;
    tabButton.classList.add('tabber-button');
    tabsContainer.appendChild(tabButton);

    const tabContent = document.createElement('div');
    if (typeof tab.content.mount === 'function') {
      tab.content.mount(tabContent);
    } else {
      tabContent.textContent = tab.content;
    }
    tabContent.classList.add('hide');
    contentContainer.appendChild(tabContent);
  });

  const tabButtons = tabsContainer.querySelectorAll('button');
  const tabContents = contentContainer.querySelectorAll('div');

  const hideContents = () => {
    tabContents.forEach((content) => content.classList.add('hide'));
  };

  const deactivateTabs = () => {
    tabButtons.forEach((tab) => tab.classList.remove('active'));
  };

  const activateContent = (index) => {
    tabContents[index].classList.remove('hide');
  };

  const activateTab = (tab) => {
    tab.classList.add('active');
  };

  tabButtons.forEach((tabButton) => tabButton.addEventListener('click', () => {
    const index = parseInt(tabButton.dataset.index, 10);

    hideContents();
    deactivateTabs();
    activateTab(tabButton);
    activateContent(index);

    this.emit('tabChange', tabs[index].value);
  }));

  this.listen('mount', () => {
    activateTab(tabButtons[0]);
    activateContent(0);
  });
}

Tabber.prototype = Object.assign(Tabber.prototype, Component.prototype);
