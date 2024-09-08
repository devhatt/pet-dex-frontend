import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '~src/utils/swiper';
import SelectorItem from '../SelectorItem';
import './index.scss';

const events = ['selector:click', 'year:change'];

const html = `
 <div class="date-selector" data-select="date-selector">
    <div>
      <div data-select="date-list">
        <ul data-select="list-content">
        </ul>
      </div>
    </div>
  </div>
`;

export default function YearSelector(dateArray) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$dateSelector = this.selected.get('date-selector');
  this.$dateList = this.selected.get('date-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  this.columnWidth = 70;
  this.activeColumnWidth = 96;
  this.nodePadding = 5;
  this.scrollLeft = this.$dateSelector.scrollLeft;

  const swiper = makeSwipable(this.$dateSelector);

  const handleItemClick = (index) => {
    const itemScroll =
      index * this.columnWidth -
      (this.viewportWidth / 2 - this.columnWidth / 2);
    this.$dateSelector.scrollLeft = itemScroll;
  };

  const emitYearChangeEvent = (year) => {
    this.emit('year:change', year);
  };

  setTimeout(() => {
    this.viewportWidth = this.$dateSelector.offsetWidth;

    const renderWindow = () => {
      this.totalContentWidth =
        (this.itemCount - 1) * this.columnWidth + this.activeColumnWidth;

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

      this.$dateList.style.width = `${this.totalContentWidth}px`;
      this.$listContent.style.transform = `translateX(${this.offsetX}px)`;

      this.$listContent.innerHTML = '';
      this.visibleChildren = new Array(this.visibleNodesCount)
        .fill(null)
        .map(
          (_, index) =>
            new SelectorItem(this.dateArray[index + this.startNode]),
        );

      this.visibleChildren.forEach((selectorItem, index) => {
        selectorItem.mount(this.$listContent);
        selectorItem.listen('item:click', () =>
          handleItemClick(index + this.startNode),
        );
        selectorItem.listen('item:change', (item) => emitYearChangeEvent(item));

        if (index === 8) {
          selectorItem.active();
        }
      });
    };

    this.$dateSelector.addEventListener('scroll', (e) => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.animationFrame = requestAnimationFrame(() => {
        this.scrollLeft = e.target.scrollLeft;
        renderWindow();

        const activeItem = this.$dateList.querySelector(
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

    swiper.left(() => {
      this.scrollLeft = Math.max(this.scrollLeft - this.columnWidth, 0);
      this.$dateSelector.scrollLeft = this.scrollLeft;
      renderWindow();
    });

    swiper.right(() => {
      this.scrollLeft = Math.min(
        this.scrollLeft + this.columnWidth,
        this.totalContentWidth - this.viewportWidth,
      );
      this.$dateSelector.scrollLeft = this.scrollLeft;
      renderWindow();
    });

    const scrollToMiddle = () => {
      this.scrollLeft = this.totalContentWidth / 2 - this.viewportWidth / 2;
      this.$dateSelector.scrollLeft = this.scrollLeft;
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
