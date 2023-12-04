import createElements from '../../utils/create-elements';
import extractElements from '../../utils/extract-elements';
import createIDFactory from '../../utils/id';
import html from './index.html?raw';
import './index.scss';

const INPUT_ID_PREFIX = 'input';
const inputIDGenerator = createIDFactory(INPUT_ID_PREFIX);

export default function Input() {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  const id = inputIDGenerator();
  this.selected.get('input').setAttribute('id', id);
  this.selected.get('label').setAttribute('for', id);
}

Input.prototype = Object.assign(Input.prototype, {
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
