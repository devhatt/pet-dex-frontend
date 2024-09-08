import { Component } from 'pet-dex-utilities';
import { makeSwipable } from '../../../../../../utils/swiper';
import SelectorItem from '../SelectorItem';
import { MONTHS } from '../../../../utils/months';
import './index.scss';

const events = ['month:change', 'selector:click'];

const html = `
 <div class="month-selector" data-select="month-selector">
    <div>
      <div data-select="month-list">
        <ul data-select="list-content">
        </ul>
      </div>
    </div>
  </div>
`;

export default function MonthSelector(dateArray) {
  Component.call(this, { html, events });

  this.dateArray = dateArray;
  this.$monthSelector = this.selected.get('month-selector');
  this.$dateList = this.selected.get('month-list');
  this.$listContent = this.selected.get('list-content');

  this.itemCount = this.dateArray.length;
  this.columnWidth = 150;
  this.nodePadding = 6;
  this.scrollLeft = this.$monthSelector.scrollLeft;

  const swiper = makeSwipable(this.$monthSelector);

  const handleItemClick = (index) => {
    const itemScroll =
      index * this.columnWidth -
      (this.viewportWidth / 2 - this.columnWidth / 2);
    this.$monthSelector.scrollLeft = itemScroll;
  };

  const emitMonthChangeEvent = (month) => {
    const newMonth = MONTHS.indexOf(month);
    this.emit('month:change', newMonth);
  };

  setTimeout(() => {
    this.viewportWidth = this.$monthSelector.offsetWidth;

    const renderWindow = () => {
      this.totalContentWidth = (this.itemCount - 1) * this.columnWidth + 176;

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
        selectorItem.listen('item:change', (item) =>
          emitMonthChangeEvent(item),
        );

        if (index === 7) {
          selectorItem.active();
        }
      });
    };

    this.$monthSelector.addEventListener('scroll', (e) => {
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
      this.$monthSelector.scrollLeft = this.scrollLeft;
      renderWindow();
    });

    swiper.right(() => {
      this.scrollLeft = Math.min(
        this.scrollLeft + this.columnWidth,
        this.totalContentWidth - this.viewportWidth,
      );
      this.$monthSelector.scrollLeft = this.scrollLeft;
      renderWindow();
    });

    const scrollToMiddle = () => {
      this.scrollLeft = this.totalContentWidth / 2 - this.viewportWidth / 2;
      this.$monthSelector.scrollLeft = this.scrollLeft;
    };

    renderWindow();
    scrollToMiddle();
  }, 0);
}

MonthSelector.prototype = Object.assign(
  MonthSelector.prototype,
  Component.prototype,
  {},
);
