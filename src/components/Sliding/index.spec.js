import { describe, expect, it, beforeEach } from 'vitest';
import Button from '../Button';
import Slinding from '.';

const button = new Button({
  text: 'Bom dia',
  isFullWidth: true,
});

const $buttonContainer = document.createElement('div');
button.mount($buttonContainer);

const button2 = new Button({
  text: 'Tamo ai',
  isFullWidth: true,
});

const $button2Container = document.createElement('div');
button2.mount($button2Container);

const button3 = new Button({
  text: 'oi',
  isFullWidth: true,
});

const $button3Container = document.createElement('div');
button3.mount($button3Container);

const propsMock = {
  items: [$buttonContainer, $button2Container, $button3Container],
  controls: true,
  loopMode: 'normal',
};

describe('Slidinng', () => {
  let sliding;
  let clickEvent;
  const $container = document.createElement('div');

  beforeEach(() => {
    sliding = new Slinding(propsMock);
    clickEvent = new Event('click');
    sliding.mount($container);
  });

  it('has three items', () => {
    expect(sliding.selected.get('sliding-content').children.length).toBe(3);
  });

  it('previous item when clicked', () => {
    sliding.setLoopMode('infinite');

    expect(sliding.getSlide()).toBe(
      sliding.selected.get('sliding-content').children[0],
    );

    sliding.selected.get('previous-button').dispatchEvent(clickEvent);

    expect(sliding.getSlide()).toBe(
      sliding.selected.get('sliding-content').children[2],
    );
  });

  it('next item when clicked', () => {
    expect(sliding.getSlide()).toBe(
      sliding.selected.get('sliding-content').children[0],
    );

    sliding.selected.get('next-button').dispatchEvent(clickEvent);

    expect(sliding.getSlide()).toBe(
      sliding.selected.get('sliding-content').children[1],
    );
  });

  it('has the slide programmatically', () => {
    sliding.setSlide($button2Container);

    expect(sliding.getSlide()).toBe($button2Container);
  });

  it('get the slide programmatically', () => {
    expect(sliding.getSlide()).toBe($buttonContainer);
  });

  it('set loop mode programmatically', () => {
    sliding.setLoopMode('infinite');

    expect(sliding.getLoopMode()).toBe('infinite');
  });

  it('get loop mode programmatically', () => {
    expect(sliding.getLoopMode()).toBe('normal');
  });

  it('controls are disabled when in normal loop mode', () => {
    expect(sliding.selected.get('previous-button').disabled).toBe(true);

    sliding.setSlide($button3Container);

    expect(sliding.selected.get('next-button').disabled).toBe(true);
  });

  it('next slide programmatically', () => {
    sliding.next();

    expect(sliding.getSlide()).toBe($button2Container);

    sliding.setSlide($button3Container);

    expect(() => sliding.next()).toThrowError('There are no next items');
  });

  it('prev slide programmatically', () => {
    expect(() => sliding.prev()).toThrowError('There are no prev items');

    sliding.setSlide($button3Container);

    sliding.prev();

    expect(sliding.getSlide()).toBe($button2Container);
  });

  it('adds an elemenet to the sliding', () => {
    const button4 = new Button({
      text: 'Oi',
      isFullWidth: true,
    });

    const $button4Container = document.createElement('div');
    button4.mount($button4Container);

    sliding.addItem($button4Container);

    expect(sliding.selected.get('sliding-content').children.length).toBe(4);
    expect(
      sliding.selected.get('sliding-content').contains($button4Container),
    ).toBe(true);
  });

  it('removes an element to the sliding', () => {
    sliding.removeItem($buttonContainer);

    expect(sliding.selected.get('sliding-content').children.length).toBe(2);
    expect(
      sliding.selected.get('sliding-content').contains($buttonContainer),
    ).toBe(false);
    expect(() => sliding.removeItem($buttonContainer)).toThrowError(
      'Item not exists',
    );
  });

  it('set controls programmatically', () => {
    sliding.setControls(true);

    const $previousButton = sliding.selected.get('previous-button');
    const $nextButton = sliding.selected.get('next-button');

    expect(sliding.getControls()).toBe(true);
    expect(
      $previousButton.classList.contains('sliding__controls--removed'),
    ).toBe(false);
    expect($nextButton.classList.contains('sliding__controls--removed')).toBe(
      false,
    );

    sliding.setControls(false);

    expect(sliding.getControls()).toBe(false);
    expect(
      $previousButton.classList.contains('sliding__controls--removed'),
    ).toBe(true);
    expect($nextButton.classList.contains('sliding__controls--removed')).toBe(
      true,
    );
  });

  it('get controls programmatically', () => {
    expect(sliding.getControls()).toBe(true);
  });

  it('clear all items', () => {
    sliding.clearItems();

    expect(sliding.selected.get('sliding-content').children.lenght).toBe(
      undefined,
    );
  });
});
