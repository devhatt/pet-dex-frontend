import createElements from '../../utils/create-elements';
import extractElements from '../../utils/extract-elements';
import html from './index.html?raw';
import './index.scss';

export default function Button() {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  this.selected
    .get('button')
    .addEventListener('click', (event) => this.click());

  this.events = {
    click: new Set(),
  };
}

Button.prototype = Object.assign(Button.prototype, {
  getText() {
    return this.selected.get('button').textContent;
  },

  setText(val) {
    this.selected.get('button').textContent = val;
  },

  click() {
    this.events.click.forEach((callback) => callback());
  },
});
