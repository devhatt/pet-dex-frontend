import { Component } from 'pet-dex-utilities';

const html = `
  <h1 data-select="text"></h1>
`;

export default function Example({
  text = 'Example',
  color = '#000',
  size = 16,
} = {}) {
  Component.call(this, { html });
  this.setText(text);
  this.setColor(color);
  this.setSize(size);
}

Example.prototype = Object.assign(Example.prototype, Component.prototype, {
  setText(text = '') {
    this.selected.get('text').textContent = text;
  },

  setColor(color = '#000') {
    this.selected.get('text').style.color = color;
  },

  setSize(size = 32) {
    this.selected.get('text').style.fontSize = `${size}px`;
  },
});
