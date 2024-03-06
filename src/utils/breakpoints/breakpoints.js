import variables from '../../styles/breakpoints.module.scss';

const { extraSmallSize, smallSize, mediumSize, largeSize, largestSize } =
  variables;

const events = new Map();
events.set('from320', new Set());
events.set('from360', new Set());
events.set('from667', new Set());
events.set('from1024', new Set());
events.set('from1280', new Set());

export function listenCallBack(breakpoint, callback) {
  const callbacks = events.get(breakpoint);
  callbacks.add(callback);
}

export function unlistenCallback(breakpoint, callback) {
  const callbacks = events.get(breakpoint);
  callbacks.delete(callback);
}

const obj = {
  from320: window.matchMedia(`(min-width: ${extraSmallSize})`),
  from360: window.matchMedia(`(min-width: ${smallSize})`),
  from667: window.matchMedia(`(min-width: ${mediumSize})`),
  from1024: window.matchMedia(`(min-width: ${largeSize})`),
  from1280: window.matchMedia(`(min-width: ${largestSize})`),
};

obj.from320.addEventListener('change', (e) => {
  const callbacks = events.get('from320');
  callbacks.forEach((callback) => callback(e.matches));
});
obj.from360.addEventListener('change', (e) => {
  const callbacks = events.get('from320');
  callbacks.forEach((callback) => callback(e.matches));
});
obj.from667.addEventListener('change', (e) => {
  const callbacks = events.get('from667');
  callbacks.forEach((callback) => callback(e.matches));
});
obj.from1024.addEventListener('change', (e) => {
  const callbacks = events.get('from1024');
  callbacks.forEach((callback) => callback(e.matches));
});
obj.from1280.addEventListener('change', (e) => {
  const callbacks = events.get('from1280');
  callbacks.forEach((callback) => callback(e.matches));
});
