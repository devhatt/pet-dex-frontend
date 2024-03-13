import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'click'];

const html = `
  <div class="tabber-container" data-select="tabber-container">
    <div class="tabber-tab" data-select="tabber-tabs"></div>
    <div class="tabber-content" data-select="tabber-content"></div>
  </div>
`;

const FIRST_TAB = 0;

/*
Fetch is used here because the SVG content is directly injected into the DOM.
If only the path were used within an IMG tag, the SVG 'fill: color' would not work.
*/
function addIconToButton(tabButton, iconURL) {
  fetch(iconURL)
    .then((response) => response.text())
    .then((svgContent) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = svgContent.trim();
      const svgElement = tempDiv.querySelector('svg');

      tabButton.appendChild(svgElement);
    });
}

function createTabElements(tab) {
  const tabButton = document.createElement('button');
  tabButton.textContent = tab.title;
  tabButton.classList.add('tabber-button');
  addIconToButton(tabButton, tab.icon);

  const tabContent = document.createElement('div');
  tab.content.mount(tabContent);
  tabContent.classList.add('tabber-component');

  return { tabButton, tabContent };
}

export default function Tabber({ tabs }) {
  Component.call(this, { html, events });

  tabs.forEach((tab) => {
    this.addTab(tab);
  });

  this.listen('mount', () => {
    const tabButtons = this.arrayOfChildren('tabber-tabs');
    const contentContainers = this.arrayOfChildren('tabber-content');

    tabButtons[FIRST_TAB].classList.add('tabber-button--active');
    contentContainers[FIRST_TAB].classList.add('tabber-component--active');
  });
}

Tabber.prototype = Object.assign(Tabber.prototype, Component.prototype, {
  getTab(index) {
    const tabButtons = this.arrayOfChildren('tabber-tabs');
    return tabButtons[index];
  },
  getContent(index) {
    const contentContainers = this.arrayOfChildren('tabber-content');
    return contentContainers[index];
  },
  getCurrentTab() {
    return this.selected
      .get('tabber-tabs')
      .querySelector('.tabber-button--active');
  },
  arrayOfChildren(selector) {
    const element = this.selected.get(selector);
    return Array.from(element.children);
  },
  activateTab(target) {
    const tabButtons = this.arrayOfChildren('tabber-tabs');
    const contentContainers = this.arrayOfChildren('tabber-content');

    const previousTab = this.getCurrentTab();
    const previousTabIndex = tabButtons.findIndex((tab) => tab === previousTab);
    const actualTab = tabButtons.findIndex((tab) => tab === target);

    if (actualTab === -1) return;

    tabButtons[previousTabIndex].classList.remove('tabber-button--active');
    contentContainers[previousTabIndex].classList.remove('tabber-component--active');

    tabButtons[actualTab].classList.add('tabber-button--active');
    contentContainers[actualTab].classList.add('tabber-component--active');
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

    const { tabButton, tabContent } = createTabElements(tab);

    tabsContainer.appendChild(tabButton);
    contentContainer.appendChild(tabContent);

    tabButton.addEventListener('click', (e) => {
      this.activateTab(e.target);
      this.emit('change', tab);
    });

    return { tabButton, tabContent };
  },
});
