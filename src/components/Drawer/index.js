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
  });

  // mount the drawer on the right outside the screen,
  // when the element is mounted it will be animated until hit right: 0

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  });

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) {
      this.close();
    }
  });

  this.listen('unmount', () => {
    window.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
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
      this.unmount(true);
      this.isOpen = false;
      this.emit('close');
    }
  },
  setTitle(title) {
    this.selected.get('title').textContent = title;
  },
  setContent(content) {
    const contentDiv = this.selected.get('content');
    content.mount(contentDiv);
  },
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },
});
