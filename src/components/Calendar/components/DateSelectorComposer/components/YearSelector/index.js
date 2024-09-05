import { Component } from 'pet-dex-utilities';
import './index.scss';
import SelectorItem from '../SelectorItem';

const events = ['selector:click'];

const html = `
 <div class="year-selector" data-select="year-selector">
    <div>
      <div data-select="year-list">
        <ul data-select="list-selector">
        </ul>
      </div>
    </div>
    </div>
`;

export default function YearSelector(yearArray) {
  Component.call(this, { html, events });

  this.yearArray = yearArray;
  this.$yearSelector = this.selected.get('year-selector');
  this.$yearList = this.selected.get('year-list');
  this.$yearContent = this.selected.get('list-selector');

  this.itemCount = this.yearArray.length;
  this.columnWidth = 75;
  this.nodePadding = 5;
  this.scrollLeft = this.$yearSelector.scrollLeft;

  setTimeout(() => {
    this.viewportWidth = this.$yearSelector.offsetWidth;

    const renderWindow = () => {
      this.totalContentWidth = this.itemCount * this.columnWidth;

      this.startNode =
        Math.floor(this.scrollLeft / this.columnWidth) - this.nodePadding;
      this.startNode = Math.max(0, this.startNode);

      this.visibleNodesCount =
        Math.ceil(this.viewportWidth / this.columnWidth) + 2 * this.nodePadding;
      this.visibleNodesCount = Math.min(
        this.itemCount - this.startNode,
        this.visibleNodesCount,
      );

      this.offsetX = this.startNode * this.columnWidth;

      this.$yearList.style.width = `${this.totalContentWidth}px`;
      this.$yearContent.style.transform = `translateX(${this.offsetX}px)`;

      this.$yearContent.innerHTML = '';
      this.visibleChildren = new Array(this.visibleNodesCount)
        .fill(null)
        .map(
          (_, index) =>
            new SelectorItem(this.yearArray[index + this.startNode]),
        );

      this.visibleChildren.forEach((selectorItem, index) => {
        selectorItem.mount(this.$yearContent);
        selectorItem.listen('item:change', (item) =>
          this.emit('selector:click', item),
        );

        if (index === 7) {
          selectorItem.active();
        }
      });
    };

    this.$yearSelector.addEventListener('scroll', (e) => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.animationFrame = requestAnimationFrame(() => {
        this.scrollLeft = e.target.scrollLeft;
        renderWindow();

        const activeItem = this.$yearList.querySelector(
          'selector-item--active',
        );
        if (activeItem) {
          activeItem.scrollIntoView({
            inline: 'center',
            behavior: 'smooth',
          });
        }
      });
    });

    const scrollToMiddle = () => {
      this.scrollLeft =
        this.totalContentWidth / 2 - this.viewportWidth / 2 - 48;
      this.$yearSelector.scrollLeft = this.scrollLeft;
    };

    renderWindow();
    scrollToMiddle();
  }, 0);
}

YearSelector.prototype = Object.assign(
  YearSelector.prototype,
  Component.prototype,
  {},
);
