import { Component } from 'pet-dex-utilities';
import { listenBreakpoint } from '../../utils/breakpoints/breakpoints';
import { makeSwipable } from '../../utils/swiper';
import close from './images/close.svg';
import line from './images/line.svg';
import './index.scss';

const events = ['open', 'close'];

const html = `
  <div class="drawer" data-select="drawer">
      <div class="drawer__wrapper" data-select="drawer-wrapper">
          <div class="drawer__nav">
            <span class="drawer__title" data-select="title"></span>
            <button class="drawer__close" data-select="close">
              <img class="drawer__close--xiszinho" src="${close}">
              <img class="drawer__close--linhazinha" src="${line}">
            </button>
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

  this.selected.get('close').addEventListener('click', () => {
    this.close();
  });

  this.listen('mount', () => {
    this.setTitle(title);
    this.setContent(content);
    setTimeout(() => {
      drawerWrapper.classList.add('drawer__wrapper--open');
    }, 1);
    window.addEventListener('keydown', this.onEscapeKey);
    drawer.addEventListener('click', this.onClickOutside);

    const swipe = () => this.close();

    listenBreakpoint('from667', (matches) => {
      if (matches) {
        makeSwipable(drawerWrapper).right(swipe);
      }
      makeSwipable(drawerWrapper).down(swipe);
    });
  });

  this.onEscapeKey = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  this.onClickOutside = (event) => {
    if (event.target === drawer) {
      this.close();
    }
  };

  this.onTransition = () => {
    this.emit('close');
    this.isOpen = false;
    drawerWrapper.removeEventListener('transitionend', this.onTransition);
    this.unmount();
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
      drawerWrapper.classList.remove('drawer__wrapper--open');
      drawerWrapper.addEventListener('transitionend', this.onTransition);
    }
  },
  setTitle(title) {
    this.selected.get('title').textContent = title;
  },
  setContent(content) {
    const contentDiv = this.selected.get('content');
    content.mount(contentDiv);
  },
});
