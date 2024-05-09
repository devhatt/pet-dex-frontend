import { Component } from 'pet-dex-utilities';
import { listenBreakpoint } from '../../utils/breakpoints/breakpoints';
import { makeSwipable } from '../../utils/swiper';
import close from './images/close.svg';
import line from './images/line.svg';
import './index.scss';

const events = ['open', 'close', 'title:change', 'content:change'];

const html = `
  <div class="drawer" data-select="drawer">
    <div class="drawer__wrapper" data-select="drawer-wrapper">
      <div class="drawer__header">
        <img class="drawer__close--line" src="${line}">
        <div class="drawer__nav">
          <span class="drawer__title" data-select="title"></span>
          <button class="drawer__close" data-select="close">
            <img class="drawer__close--icon" src="${close}">
          </button>
        </div>
      </div>
      <div class="drawer__content" data-select="content"></div>
    </div>
  </div>
`;

export default function Drawer({ title, content }) {
  Component.call(this, { html, events });

  const drawer = this.selected.get('drawer');
  const drawerWrapper = this.selected.get('drawer-wrapper');
  this.isOpen = false;

  this.selected.get('close').addEventListener('click', () => this.close());

  this.setTitle(title);
  this.setContent(content);
  makeSwipable(drawerWrapper);

  listenBreakpoint('from667', (matches) => {
    if (matches) {
      drawerWrapper.addEventListener('swipe-right', () => this.close());
    }
    drawerWrapper.addEventListener('swipe-down', () => this.close());
  });

  this.listen('mount', () => {
    requestAnimationFrame(() => {
      drawerWrapper.classList.add('drawer__wrapper--open');
      drawer.classList.add('drawer--open');
    });
    window.addEventListener('keydown', this.onEscapeKey);
    drawer.addEventListener('click', this.onClickOutside);
  });

  this.onEscapeKey = (event) => {
    if (event.key === 'Escape') this.close();
  };

  this.onClickOutside = (event) => {
    if (event.target === drawer) this.close();
  };

  this.listen('unmount', () => {
    window.removeEventListener('keydown', this.onEscapeKey);
    drawer.removeEventListener('click', this.onClickOutside);
  });
}

Drawer.prototype = Object.assign(Drawer.prototype, Component.prototype, {
  open() {
    if (!this.isOpen) {
      this.mount(document.body, true);
      this.isOpen = true;
      this.emit('open');
    }
  },
  close() {
    if (this.isOpen) {
      const drawerWrapper = this.selected.get('drawer-wrapper');
      this.selected.get('drawer').classList.remove('drawer--open');
      drawerWrapper.classList.remove('drawer__wrapper--open');
      drawerWrapper.addEventListener(
        'transitionend',
        () => {
          this.emit('close');
          this.isOpen = false;
          this.unmount();
        },
        { once: true },
      );
    }
  },
  setTitle(title) {
    this.selected.get('title').textContent = title;
    this.emit('title:change', title);
  },
  setContent(content) {
    const contentDiv = this.selected.get('content');
    content.mount(contentDiv);
    this.emit('content:change', content);
  },
});
