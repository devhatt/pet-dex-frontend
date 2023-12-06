import createElements from '../utils/create-elements';
import extractElements from '../utils/extract-elements';

const componentEvents = ['mount', 'unmount'];

export default function Component({ html, events = [] } = {}) {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  this.events = new Map();
  componentEvents
    .concat(events)
    .forEach((name) => this.events.set(name, new Set()));
}

Component.prototype = Object.assign(Component.prototype, {
  isMounted() {
    return this.elements.every((element) => element.parentNode);
  },

  mount($container, force = false) {
    if (!force && this.isMounted()) return;

    $container.append(...this.elements);
    this.emit('mount');
  },

  unmount(force = false) {
    if (!force && !this.isMounted()) return;

    this.elements.forEach((element) => element.remove());
    this.emit('unmount');
  },

  toggleMount($container, condition, force = false) {
    if (condition == null) {
      condition = !this.isMounted();
      force = true;
    }

    if (condition) this.mount($container, force);
    else this.unmount(force);
  },

  listen(eventName, callback) {
    const event = this.events.get(eventName);
    if (!event) {
      console.warn('event not found: ' + eventName);
      return;
    }

    event.add(callback);
  },

  emit(eventName, ...args) {
    const event = this.events.get(eventName);
    if (!event) {
      console.warn('event not found: ' + eventName);
      return;
    }

    event.forEach((callback) => callback.apply(null, args));
  },
});
