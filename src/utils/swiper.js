export function initializeSwiper({ deadZone = 50 } = {}) {
  const coordinates = {
    $element: null,
    xDown: null,
    yDown: null,
    xUp: null,
    yUp: null,
  };

  const dispatchSwipeLeft = () => {
    const event = new Event('swipe-left');
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeRight = () => {
    const event = new Event('swipe-right');
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeUp = () => {
    const event = new Event('swipe-up');
    coordinates.$element.dispatchEvent(event);
  };

  const dispatchSwipeDown = () => {
    const event = new Event('swipe-down');
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
    coordinates.$element = event.target;

    coordinates.xDown = event.touches[0].clientX;
    coordinates.yDown = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
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
  }
}
