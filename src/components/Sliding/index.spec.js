import { describe, expect, it, beforeEach } from 'vitest';
import Slinding from '.';

const $slide1 = document.createElement('div');
$slide1.style.height = '200px';
$slide1.style.backgroundColor = 'red';

const $slide2 = document.createElement('div');
$slide2.style.height = '200px';
$slide2.style.backgroundColor = 'pink';

const $slide3 = document.createElement('div');
$slide3.style.height = '200px';
$slide3.style.backgroundColor = 'green';

const $slide4 = document.createElement('div');
$slide4.style.height = '200px';
$slide4.style.backgroundColor = 'black';

const propsMock = {
  slides: [$slide1, $slide2, $slide3],
};

describe('Sliding', () => {
  let sliding;
  const $container = document.createElement('div');

  beforeEach(() => {
    sliding = new Slinding(propsMock);
    sliding.mount($container);
  });

  it('has three slides', () => {
    expect(sliding.selected.get('sliding-content').children.length).toBe(3);
  });

  it('add slide programmatically', () => {
    sliding.add($slide4);

    expect(sliding.selected.get('sliding-content').children.length).toBe(4);
    expect(sliding.selected.get('sliding-content').children).toContain($slide4);
    expect(
      sliding.selected.get('sliding-content').children[3].classList,
    ).toContain('sliding__content__slide');
  });

  it('remove slide programmatically', () => {
    sliding.remove($slide3);

    expect(sliding.selected.get('sliding-content').children.length).toBe(2);
    expect(sliding.selected.get('sliding-content').children).not.toContain(
      $slide3,
    );
  });

  it('move to the next slide programmatically', () => {
    const startingPosition =
      sliding.selected.get('sliding-content').style.transform;

    sliding.next();

    const currentPosition =
      sliding.selected.get('sliding-content').style.transform;

    expect(currentPosition).toEqual(expect.stringContaining('translateX'));
    expect(startingPosition).not.toBe(currentPosition);
    expect(
      sliding.selected.get('sliding-content').children[0].classList,
    ).not.toContain('sliding__content__slide--active');
    expect(
      sliding.selected.get('sliding-content').children[1].classList,
    ).toContain('sliding__content__slide--active');
  });

  it('move to the previous slide programmatically', () => {
    const startingPosition =
      sliding.selected.get('sliding-content').style.transform;
    sliding.prev();
    const currentPosition =
      sliding.selected.get('sliding-content').style.transform;

    expect(currentPosition).toEqual(expect.stringContaining('translateX'));
    expect(startingPosition).not.toBe(currentPosition);
    expect(
      sliding.selected.get('sliding-content').children[0].classList,
    ).not.toContain('sliding__content__slide--active');
    expect(
      sliding.selected.get('sliding-content').children[2].classList,
    ).toContain('sliding__content__slide--active');
  });

  it('clear slides programmatically', () => {
    sliding.clear();

    expect(sliding.selected.get('sliding-content').children.length).toBe(0);
  });
});
