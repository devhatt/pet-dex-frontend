import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '~src/utils/swiper';
import SelectorItem from '../SelectorItem';
import './index.scss';

const events = ['selector:click', 'year:change'];

const html = `
 <div class="year-selector" data-select="year-selector">
    <div>
      <div class="year-selector__wrapper" data-select="date-list">
        <ul class="year-selector__list" data-select="list-content">
        </ul>
      </div>
    </div>
  </div>
`;

export default function YearSelector({ dateArray, nodePadding = 5 }) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$yearSelector = this.selected.get('year-selector');
  this.$dateList = this.selected.get('date-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  const columnWidth = 70;
  const activeColumnWidth = 96;
  this.nodePadding = nodePadding;
  this.scrollLeft = this.$yearSelector.scrollLeft;

  const swiper = makeSwipable(this.$yearSelector);

  const handleItemClick = (index) => {
    const itemScroll =
      index * columnWidth - (this.viewportWidth / 2 - columnWidth / 2);
    this.$yearSelector.scrollLeft = itemScroll;
  };

  const calculateViewport = () => {
    this.viewportWidth = this.$yearSelector.offsetWidth;
  };

  const renderWindow = () => {
    this.totalContentWidth =
      (this.itemCount - 1) * columnWidth + activeColumnWidth;

    this.startNode =
      Math.floor(this.scrollLeft / columnWidth) - this.nodePadding;
    this.startNode = Math.max(0, this.startNode);

    this.visibleNodesCount =
      Math.ceil(this.viewportWidth / columnWidth) + 2 * this.nodePadding;
    this.visibleNodesCount = Math.min(
      this.itemCount - this.startNode,
      this.visibleNodesCount,
    );

    this.offsetX = this.startNode * columnWidth;

    this.$dateList.style.width = `${this.totalContentWidth}px`;
    this.$listContent.style.transform = `translateX(${this.offsetX}px)`;

    this.$listContent.innerHTML = '';
    this.visibleChildren = new Array(this.visibleNodesCount)
      .fill(null)
      .map(
        (_, index) => new SelectorItem(this.dateArray[index + this.startNode]),
      );

    this.visibleChildren.forEach((selectorItem, index) => {
      selectorItem.mount(this.$listContent);
      selectorItem.listen('item:click', () =>
        handleItemClick(index + this.startNode),
      );
      selectorItem.listen('item:change', (item) =>
        this.emit('year:change', item),
      );
    });

    const middlePosition = this.scrollLeft + this.viewportWidth / 2;
    const activeIndex = Math.round(
      (middlePosition - this.offsetX) / columnWidth - 1,
    );

    if (activeIndex >= 0 && activeIndex < this.visibleChildren.length) {
      this.visibleChildren[activeIndex].active();
    }
  };

  const scrollToMiddle = () => {
    this.scrollLeft = this.totalContentWidth / 2 - this.viewportWidth / 2;
    this.$yearSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  };

  this.$yearSelector.addEventListener('scroll', (e) => {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.animationFrame = requestAnimationFrame(() => {
      this.scrollLeft = e.target.scrollLeft;
      renderWindow();
    });
  });

  swiper.left(() => {
    this.scrollLeft = Math.max(this.scrollLeft - columnWidth, 0);
    this.$yearSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  });

  swiper.right(() => {
    this.scrollLeft = Math.min(
      this.scrollLeft + columnWidth,
      this.totalContentWidth - this.viewportWidth,
    );
    this.$yearSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  });

  window.addEventListener('resize', () => {
    calculateViewport();
    scrollToMiddle();
  });

  requestAnimationFrame(() => {
    calculateViewport();
    renderWindow();
    scrollToMiddle();
  });
}

YearSelector.prototype = Object.assign(
  YearSelector.prototype,
  Component.prototype,
  {},
);
