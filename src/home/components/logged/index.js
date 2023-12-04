import Button from '../../../components/button';
import createElements from '../../../utils/create-elements';
import extractElements from '../../../utils/extract-elements';
import html from './index.html?raw';
import './index.scss';

export default function Logged() {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  this.button = new Button();
  this.button.setText('Logout');
  this.button.selected
    .get('button')
    .addEventListener('click', (event) => this.logout());

  this.elements.push(...this.button.elements);

  this.events = {
    logout: new Set(),
  };
}

Logged.prototype = Object.assign(Logged.prototype, {
  getName() {
    return this.selected.get('name').textContent;
  },

  setName(val) {
    this.selected.get('name').textContent = val;
  },

  logout() {
    this.events.logout.forEach((callback) => callback());
  },
});
