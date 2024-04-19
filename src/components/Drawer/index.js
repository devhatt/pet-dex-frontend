import { Component } from 'pet-dex-utilities';
import close from './images/close.svg';
import './index.scss';

const events = ['open', 'close'];

const html = `
  <div class="drawer" data-select="drawer">
      <div class="drawer__wrapper" data-select="drawer-wrapper">
          <div class="drawer__nav">
            <span class="drawer__title" data-select="title"></span>
            <button class="drawer__close" data-select="close"><img src="${close}"></button>
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
    window.addEventListener('keydown', this.handleKeyDown);
    drawer.addEventListener('click', this.handleClickOutside);
  });

  this.handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  this.handleClickOutside = (event) => {
    if (event.target === drawer) {
      this.close();
    }
  };

  this.transitionHandler = () => {
    this.emit('close');
    this.isOpen = false;
    drawerWrapper.removeEventListener('transitionend', this.transitionHandler);
    this.unmount();
  };

  this.listen('unmount', () => {
    window.removeEventListener('keydown', this.handleKeyDown);
    drawer.removeEventListener('click', this.handleClickOutside);
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
      drawerWrapper.addEventListener('transitionend', this.transitionHandler);
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
