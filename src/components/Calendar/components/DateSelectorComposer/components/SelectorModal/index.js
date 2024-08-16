import { Component } from 'pet-dex-utilities';
import ModalItem from './components/ModalItem';

import './index.scss';

const events = ['month:change', 'year:change'];

const html = `
    <div class="selector-modal" data-select="selector-modal">
      <div>
        <div data-select="modal-list">
          <ul data-select="list-content">
          </ul>
        </div>
      </div>
    </div>
`;

export default function SelectorModal(dateArray) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$selectorModal = this.selected.get('selector-modal');
  this.$modalList = this.selected.get('modal-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  this.rowHeight = 42.8;
  this.nodePadding = 5;
  this.scrollTop = this.$selectorModal.scrollTop;

  setTimeout(() => {
    this.viewportHeight = this.$selectorModal.offsetHeight;

    const renderWindow = () => {
      this.totalContentHeight = this.itemCount * this.rowHeight;

      this.startNode =
        Math.floor(this.scrollTop / this.rowHeight) - this.nodePadding;
      this.startNode = Math.max(0, this.startNode);

      this.visibleNodesCount =
        Math.ceil(this.viewportHeight / this.rowHeight) + 2 * this.nodePadding;
      this.visibleNodesCount = Math.min(
        this.itemCount - this.startNode,
        this.visibleNodesCount,
      );

      this.offsetY = this.startNode * this.rowHeight;

      this.$modalList.style.height = `${this.totalContentHeight}px`;
      this.$listContent.style.transform = `translateY(${this.offsetY}px)`;

      this.$listContent.innerHTML = '';
      this.visibleChildren = new Array(this.visibleNodesCount)
        .fill(null)
        .map(
          (_, index) => new ModalItem(this.dateArray[index + this.startNode]),
        );

      this.visibleChildren.forEach((modalItem, index) => {
        modalItem.mount(this.$listContent);

        if (index === 8) modalItem.active();
      });
    };

    this.$selectorModal.addEventListener('scroll', (e) => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.animationFrame = requestAnimationFrame(() => {
        const nearestIndex = Math.round(this.scrollTop / this.rowHeight);
        this.scrollTop = nearestIndex * this.rowHeight;
        this.scrollTop = e.target.scrollTop;
        renderWindow();
      });
    });

    const scrollToMiddle = () => {
      this.scrollTop = this.totalContentHeight / 2 - this.viewportHeight / 2;
      this.$selectorModal.scrollTop = this.scrollTop;
    };

    renderWindow();
    scrollToMiddle();
  }, 0);
}

SelectorModal.prototype = Object.assign(
  SelectorModal.prototype,
  Component.prototype,
  {},
);
