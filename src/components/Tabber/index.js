import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'click'];

const html = `
  <div class="tabber-container" data-select="tabber-container">
    <div class="tabber-tab" data-select="tabber-tabs"></div>
    <div class="tabber-content" data-select="tabber-content"></div>
  </div>
`;

/**
 * Fetch is used here because the SVG content is directly injected into the DOM.
 * If only the path were used within an IMG tag, the SVG 'fill: color' would not work.
 */
function addIconToButton(tabButton, iconURL) {
  if (!iconURL) return Promise.resolve();
  return fetch(iconURL)
    .then((response) => response.text())
    .then((svgContent) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = svgContent.trim();
      const svgElement = tempDiv.querySelector('svg');

      tabButton.appendChild(svgElement);
    })
    .catch((error) => Promise.reject(error));
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

export default function Tabber({ tabs, activeTabOnInit = 0 }) {
  Component.call(this, { html, events });

  this.currentTab = {};

  tabs.forEach((tab) => {
    this.addTab(tab);
  });

  this.listen('mount', () => {
    const tabButtons = this.arrayOfChildren('tabber-tabs');
    const contentContainer = this.arrayOfChildren('tabber-content');

    this.currentTab.button = tabButtons[activeTabOnInit];
    this.currentTab.content = contentContainer[activeTabOnInit];

    tabButtons[activeTabOnInit].classList.add('tabber-button--active');
    contentContainer[activeTabOnInit].classList.add('tabber-component--active');
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
  arrayOfChildren(selector) {
    const element = this.selected.get(selector);
    return Array.from(element.children);
  },
  activateTab(target) {
    const tabButtons = this.arrayOfChildren('tabber-tabs');
    const contentContainers = this.arrayOfChildren('tabber-content');

    this.currentTab.button.classList.remove('tabber-button--active');
    this.currentTab.content.classList.remove('tabber-component--active');

    this.currentTab.button = target;
    this.currentTab.content = contentContainers[tabButtons.findIndex((tab) => tab === target)];

    this.currentTab.button.classList.add('tabber-button--active');
    this.currentTab.content.classList.add('tabber-component--active');
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
