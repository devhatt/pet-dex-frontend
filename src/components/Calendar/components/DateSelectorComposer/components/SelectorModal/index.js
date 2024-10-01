import { Component } from 'pet-dex-utilities';
import ModalItem from './components/ModalItem';

import './index.scss';

const events = ['date:change'];

const html = `
    <div class="selector-modal" data-select="selector-modal">
      <div>
        <div class="selector-modal__wrapper" data-select="modal-list">
          <ul class="selector-modal__list" data-select="list-content">
          </ul>
        </div>
      </div>
    </div>
`;

export default function SelectorModal({ dateArray, nodePadding = 5 }) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$selectorModal = this.selected.get('selector-modal');
  this.$modalList = this.selected.get('modal-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  const rowHeight = 34;
  const activeRowHeight = 42.8;
  this.nodePadding = nodePadding;
  this.scrollTop = this.$selectorModal.scrollTop;

  setTimeout(() => {
    this.viewportHeight = this.$selectorModal.offsetHeight;

    const renderWindow = () => {
      this.totalContentHeight =
        (this.itemCount - 1) * rowHeight + activeRowHeight;

      this.startNode =
        Math.floor(this.scrollTop / rowHeight) - this.nodePadding;
      this.startNode = Math.max(0, this.startNode);

      this.visibleNodesCount =
        Math.ceil(this.viewportHeight / rowHeight) + 2 * this.nodePadding;
      this.visibleNodesCount = Math.min(
        this.itemCount - this.startNode,
        this.visibleNodesCount,
      );

      this.offsetY = this.startNode * rowHeight;

      this.$modalList.style.height = `${this.totalContentHeight}px`;
      this.$listContent.style.transform = `translateY(${this.offsetY}px)`;

      this.$listContent.innerHTML = '';
      this.visibleChildren = new Array(this.visibleNodesCount)
        .fill(null)
        .map(
          (_, index) =>
            new ModalItem({ item: this.dateArray[index + this.startNode] }),
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
