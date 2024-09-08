import { Component } from 'pet-dex-utilities';
import ModalItem from './components/ModalItem';

import './index.scss';

const events = ['date:change'];

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
  this.rowHeight = 34;
  this.activeRowHeight = 42.8;
  this.nodePadding = 5;
  this.scrollTop = this.$selectorModal.scrollTop;

  setTimeout(() => {
    this.viewportHeight = this.$selectorModal.offsetHeight;

    const renderWindow = () => {
      this.totalContentHeight =
        (this.itemCount - 1) * this.rowHeight + this.activeRowHeight;

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
        modalItem.listen('item:change', (item) =>
          this.emit('date:change', item),
        );

        if (index === 8) {
          modalItem.active();
        }
      });
    };
    this.$selectorModal.addEventListener('scroll', (e) => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.animationFrame = requestAnimationFrame(() => {
        this.scrollTop = e.target.scrollTop;
        renderWindow();

        const activeItem = this.$listContent.querySelector(
          'selector-item--active',
        );
        if (activeItem) {
          activeItem.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          });
        }
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
