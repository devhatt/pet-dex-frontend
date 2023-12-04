import createElements from '../../../utils/create-elements';
import extractElements from '../../../utils/extract-elements';
import html from './index.html?raw';
import './index.scss';

export default function TODOItem() {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  this.selected.get('checkbox').addEventListener('change', (event) => {
    const checked = this.isChecked();
    this.toggle(checked, true);
  });

  this.selected.get('text').addEventListener('change', (event) => {
    const text = this.getText();
    this.setText(text);
  });

  this.events = {
    text: new Set(),
    check: new Set(),
    uncheck: new Set(),
  };
}

TODOItem.prototype = Object.assign(TODOItem.prototype, {
  getText() {
    return this.selected.get('text').value;
  },

  setText(val) {
    this.selected.get('text').value = val;
    this.events.text.forEach((callback) => callback(val));
  },

  isChecked() {
    return this.selected.get('checkbox').checked;
  },

  toggle(value, force = false) {
    if (!value && value != null) return this.uncheck(force);
    if (value) return this.check(force);

    if (this.isChecked()) this.uncheck(true);
    else this.check(true);
  },

  check(force = false) {
    if (!force && this.isChecked()) return;

    this.selected.get('checkbox').checked = true;
    this.events.check.forEach((callback) => callback());
  },

  uncheck(force = false) {
    if (!force && this.isChecked()) return;

    this.selected.get('checkbox').checked = false;
    this.events.uncheck.forEach((callback) => callback());
  },
});
