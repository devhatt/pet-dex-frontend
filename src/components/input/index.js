import createIDFactory from '../../utils/id';
import Component from '../component';
import html from './index.html?raw';
import './index.scss';

const INPUT_ID_PREFIX = 'input';
const inputIDGenerator = createIDFactory(INPUT_ID_PREFIX);

const events = [];

export default function Input() {
  Component.call(this, { html, events });

  const id = inputIDGenerator();
  this.selected.get('input').setAttribute('id', id);
  this.selected.get('label').setAttribute('for', id);
}

Input.prototype = Object.assign(Input.prototype, Component.prototype, {
  getLabel() {
    return this.selected.get('label').textContent;
  },

  setLabel(val) {
    this.selected.get('label').textContent = val;
  },

  getValue() {
    return this.selected.get('input').value;
  },

  setValue(val) {
    this.selected.get('input').value = val;
  },
});
