import variables from '../styles/breakpoints.module.scss';

const { extraSmallSize, smallSize, mediumSize, largeSize, largestSize } =
  variables;

export default function breakpointJs() {
  const obj = {
    from320: false,
    from360: false,
    from667: false,
    from1024: false,
    from1280: false,
  };

  if (window.matchMedia(`(min-width: ${largestSize})`).matches) {
    obj.from1280 = true;
  } else if (window.matchMedia(`(min-width: ${largeSize})`).matches) {
    obj.from1024 = true;
  } else if (window.matchMedia(`(min-width: ${mediumSize})`).matches) {
    obj.from667 = true;
  } else if (window.matchMedia(`(min-width:${smallSize})`).matches) {
    obj.from360 = true;
  } else if (window.matchMedia(`(min-width: ${extraSmallSize})`).matches) {
    obj.from320 = true;
  }
  return obj;
}
