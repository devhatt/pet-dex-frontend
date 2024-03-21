import { describe, expect, it, beforeEach } from 'vitest';
import { initializeSwiper } from './swiper';

describe('Swiper', () => {
  initializeSwiper();
  const mockElement = document.createElement('div');
  const touchStartEvent = new Event('touchstart');
  const touchEndEvent = new Event('touchend');
  Object.defineProperty(touchStartEvent, 'target', {
    writable: false,
    value: mockElement,
  });

  let eventFired = {
    swipeLeft: false,
    swipeRight: false,
    swipeUp: false,
    swipeDown: false,
  };

  mockElement.addEventListener('swipe-left', () => {
    eventFired.swipeLeft = true;
  });
  mockElement.addEventListener('swipe-right', () => {
    eventFired.swipeRight = true;
  });
  mockElement.addEventListener('swipe-up', () => {
    eventFired.swipeUp = true;
  });
  mockElement.addEventListener('swipe-down', () => {
    eventFired.swipeDown = true;
  });

  beforeEach(() => {
    eventFired = {
      swipeLeft: false,
      swipeRight: false,
      swipeUp: false,
      swipeDown: false,
    };
  });

  it('dispatches swipe-left event', () => {
    touchStartEvent.touches = [{ clientX: 200, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 0, clientY: 100 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(true);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(false);
  });

  it('dispatches swipe-right event', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 200, clientY: 100 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(true);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(false);
  });

  it('dispatches swipe-up event', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 200 }];
    touchEndEvent.changedTouches = [{ clientX: 100, clientY: 0 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(true);
    expect(eventFired.swipeDown).toBe(false);
  });

  it('dispatches swipe-down event', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 100, clientY: 200 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(true);
  });

  it('does not dispatch any event when swipe is not detected', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 0, clientY: 0 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(false);
  });

  it('does not dispatch any event when swipe is not long enough', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 50, clientY: 50 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(false);
  });

  it('dispatches vertical event when direction is esqual', () => {
    touchStartEvent.touches = [{ clientX: 0, clientY: 0 }];
    touchEndEvent.changedTouches = [{ clientX: 51, clientY: 51 }];

    window.dispatchEvent(touchStartEvent);
    window.dispatchEvent(touchEndEvent);

    expect(eventFired.swipeLeft).toBe(false);
    expect(eventFired.swipeRight).toBe(false);
    expect(eventFired.swipeUp).toBe(false);
    expect(eventFired.swipeDown).toBe(true);
  });
});
