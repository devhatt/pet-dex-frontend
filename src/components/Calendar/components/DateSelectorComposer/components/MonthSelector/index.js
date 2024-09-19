import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '~src/utils/swiper';
import SelectorItem from '../SelectorItem';
import { MONTHS } from '../../../../utils/months';
import './index.scss';

const events = ['month:change', 'selector:click'];

const html = `
 <div class="month-selector" data-select="month-selector">
    <div>
      <div class="month-selector__wrapper" data-select="month-list">
        <ul class="month-selector__list" data-select="list-content">
        </ul>
      </div>
    </div>
  </div>
`;

export default function MonthSelector({ dateArray, nodePadding = 5 }) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$monthSelector = this.selected.get('month-selector');
  this.$dateList = this.selected.get('month-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  const columnWidth = 150;
  const activeColumnWidth = 176;
  this.nodePadding = nodePadding;
  this.scrollLeft = this.$monthSelector.scrollLeft;

  const swiper = makeSwipable(this.$monthSelector);

  const handleItemClick = (index) => {
    const itemScroll =
      index * columnWidth - (this.viewportWidth / 2 - columnWidth / 2);
    this.$monthSelector.scrollLeft = itemScroll;
  };

  const emitMonthChangeEvent = (month) => {
    const newMonth = MONTHS.indexOf(month);
    this.emit('month:change', newMonth);
  };

  const calculateViewport = () => {
    this.viewportWidth = this.$monthSelector.offsetWidth;
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
      selectorItem.listen('item:change', (item) => emitMonthChangeEvent(item));
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
    this.$monthSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  };

  this.$monthSelector.addEventListener('scroll', (e) => {
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
    this.$monthSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  });

  swiper.right(() => {
    this.scrollLeft = Math.min(
      this.scrollLeft + columnWidth,
      this.totalContentWidth - this.viewportWidth,
    );
    this.$monthSelector.scrollLeft = this.scrollLeft;
    renderWindow();
  });

  this.listen('mount', () => {
    window.addEventListener('resize', () => {
      calculateViewport();
      scrollToMiddle();
    });
  });

  requestAnimationFrame(() => {
    calculateViewport();
    renderWindow();
    scrollToMiddle();
  });
}

MonthSelector.prototype = Object.assign(
  MonthSelector.prototype,
  Component.prototype,
  {},
);
