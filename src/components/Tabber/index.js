import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'click', 'removed', 'added'];

const html = `
  <div class="tabber-container" data-select="tabber-container">
    <div class="tabber-tab" data-select="tabber-tabs"></div>
    <div class="tabber-content" data-select="tabber-content"></div>
  </div>
`;

// Uso fetch nessa função porque estou colocando o conteudo do svg direto no DOM.
// Se eu usasse apenas o path dentro de uma tag IMG, o fill do svg não seria alterado pelo CSS.
function addIconToButton(tabButton, iconURL) {
  if (!iconURL) return;

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
  if (typeof tab.content.mount === 'function') {
    tab.content.mount(tabContent);
  }
  tabContent.classList.add('hide');

  return { tabButton, tabContent };
}

export default function Tabber({ tabs }) {
  Component.call(this, { html, events });

  tabs.forEach((tab) => {
    this.addTab(tab);
  });

  this.listen('mount', () => {
    const firstTabButton = this.getTab(0);
    this.activateTab({ target: firstTabButton });
  });
}

Tabber.prototype = Object.assign(Tabber.prototype, Component.prototype, {
  getTab(index) {
    const tabButtons = Array.from(this.selected.get('tabber-tabs').children);
    return tabButtons[index];
  },
  getContent(index) {
    const contentContainers = Array.from(
      this.selected.get('tabber-content').children,
    );
    return contentContainers[index];
  },
  getCurrentTab() {
    return this.selected
      .get('tabber-tabs')
      .querySelector('.tabber-button--active');
  },
  activateTab(e) {
    const tabButtons = Array.from(this.selected.get('tabber-tabs').children);
    const contentContainers = Array.from(
      this.selected.get('tabber-content').children,
    );

    const clickedTab = e.target;
    const tabIndex = tabButtons.findIndex((tab) => tab === clickedTab);

    if (tabIndex === -1) return;

    tabButtons.forEach((tab) => tab.classList.remove('tabber-button--active'));
    contentContainers.forEach((content) => content.classList.add('hide'));

    contentContainers[tabIndex].classList.remove('hide');

    clickedTab.classList.add('tabber-button--active');
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
      this.activateTab(e);
      this.emit('change', tab);
    });

    return { tabButton, tabContent };
  },
});
