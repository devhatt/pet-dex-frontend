import variables from '../../styles/breakpoints.module.scss';

const { extraSmallSize, smallSize, mediumSize, largeSize, largestSize } =
  variables;

const events = new Map();
events.set('from320', new Set());
events.set('from360', new Set());
events.set('from667', new Set());
events.set('from1024', new Set());
events.set('from1280', new Set());

const obj = {
  from320: window.matchMedia(`(min-width: ${extraSmallSize})`),
  from360: window.matchMedia(`(min-width: ${smallSize})`),
  from667: window.matchMedia(`(min-width: ${mediumSize})`),
  from1024: window.matchMedia(`(min-width: ${largeSize})`),
  from1280: window.matchMedia(`(min-width: ${largestSize})`),
};

export function listenBreakpoint(breakpoint, callback) {
  const callbacks = events.get(breakpoint);
  if (!callbacks) {
    console.warn('callback not found: ', breakpoint);
    return;
  }
  callbacks.add(callback);
  callback(obj[breakpoint].matches);
}

export function unlistenBreakpoint(breakpoint, callback) {
  const callbacks = events.get(breakpoint);
  if (!callbacks) {
    console.warn('callback not found: ', breakpoint);
    return;
  }
  callbacks.delete(callback);
}

Object.keys(obj).forEach((key) => {
  obj[key].addEventListener('change', (e) => {
    const callbacks = events.get(key);
    callbacks.forEach((callback) => callback(e.matches));
  });
});
