const SWIPABLE = 'data-swipable';
const SWIPE_LEFT = 'swipe-left';
const SWIPE_RIGHT = 'swipe-right';
const SWIPE_UP = 'swipe-up';
const SWIPE_DOWN = 'swipe-down';

export function makeSwipable($element) {
  $element.setAttribute(SWIPABLE, '');

  const api = {
    left(callback) {
      $element.addEventListener(SWIPE_LEFT, callback);
      return api;
    },

    right(callback) {
      $element.addEventListener(SWIPE_RIGHT, callback);
      return api;
    },

    up(callback) {
      $element.addEventListener(SWIPE_UP, callback);
      return api;
    },

    down(callback) {
      $element.addEventListener(SWIPE_DOWN, callback);
      return api;
    },
  };

  return api;
}

export function initializeSwiper({ deadZone = 50 } = {}) {
  const coordinates = {
    $element: null,
    xDown: null,
    yDown: null,
    xUp: null,
    yUp: null,
  };

  const dispatchSwipeLeft = () => {
    const event = new Event(SWIPE_LEFT);
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeRight = () => {
    const event = new Event(SWIPE_RIGHT);
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeUp = () => {
    const event = new Event(SWIPE_UP);
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeDown = () => {
    const event = new Event(SWIPE_DOWN);
    coordinates.$element.dispatchEvent(event);
  };

  function swipeDirection() {
    const xDiff = coordinates.xUp - coordinates.xDown;
    const yDiff = coordinates.yUp - coordinates.yDown;

    const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);
    const isLeft = xDiff < 0;
    const isRight = xDiff > 0;
    const isUp = yDiff < 0;
    const isDown = yDiff > 0;

    if (isHorizontal && isLeft) dispatchSwipeLeft();
    if (isHorizontal && isRight) dispatchSwipeRight();
    if (!isHorizontal && isUp) dispatchSwipeUp();
    if (!isHorizontal && isDown) dispatchSwipeDown();
  }

  function handleTouchStart(event) {
    coordinates.$element = event
      .composedPath()
      .find(($el) => $el.hasAttribute && $el.hasAttribute(SWIPABLE));

    if (coordinates.$element == null) return;

    coordinates.xDown = event.touches[0].clientX;
    coordinates.yDown = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    if (coordinates.$element == null) return;

    coordinates.xUp = event.changedTouches[0].clientX;
    coordinates.yUp = event.changedTouches[0].clientY;

    const xDiff = coordinates.xUp - coordinates.xDown;
    const yDiff = coordinates.yUp - coordinates.yDown;

    const didSwipe = Math.abs(xDiff) > deadZone || Math.abs(yDiff) > deadZone;

    if (didSwipe) swipeDirection();
  }

  window.addEventListener('touchstart', handleTouchStart, false);
  window.addEventListener('touchend', handleTouchEnd, false);

  return function destroy() {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
  };
}
