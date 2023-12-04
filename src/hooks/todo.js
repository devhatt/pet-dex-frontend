import { nanoid } from 'nanoid';

export default function TODO() {
  this.map = new Map();
  this.items = [];

  this.events = {
    text: new Set(),
    added: new Set(),
    removed: new Set(),
    check: new Set(),
    uncheck: new Set(),
  };
}

TODO.prototype = Object.assign(TODO.prototype, {
  getByID(id) {
    return this.map.get(id); // TODO: probably make it immutable or observable
  },

  removeByID(id) {
    const item = this.map.get(id);
    if (!item) return;

    this.items.splice(this.items.indexOf(item), 1);
    this.map.delete(id);
    this.events.removed.forEach((callback) => callback(item));
  },

  setTextByID(id, text) {
    const item = this.map.get(id);
    if (!item) return;

    item.text = text;
    this.events.text.forEach((callback) => callback(item)); // TODO: probably make it immutable or observable
  },

  checkByID(id) {
    const item = this.map.get(id);
    if (!item || item.checked) return;

    item.checked = true;
    this.events.check.forEach((callback) => callback(item)); // TODO: probably make it immutable or observable
  },

  uncheckByID(id) {
    const item = this.map.get(id);
    if (!item || !item.checked) return;

    item.checked = false;
    this.events.uncheck.forEach((callback) => callback(item)); // TODO: probably make it immutable or observable
  },

  create(text, checked = false, id = nanoid()) {
    const item = { text, checked, id };
    this.map.set(item.id, item);
    this.items.push(item);
    this.events.added.forEach((callback) => callback(item)); // TODO: probably make it immutable or observable
    return item; // TODO: probably make it immutable or observable
  },
});
