import { describe, expect, it, test } from 'vitest';
import ProgressBar from './index';

describe('ProgressBar', () => {
  it('is a Function', () => {
    expect(ProgressBar).toBeInstanceOf(Function);
  });

  it('returns an object', () => {
    expect(new ProgressBar()).toBeInstanceOf(Object);
  });

  test.each([
    [-1, 0],
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 0],
  ])('it initializes with a specific valid value set', (value, expected) => {
    const progressBar = new ProgressBar(0, 5, value);
    expect(progressBar.value).toBe(expected);
  });

  it('increments value when next is called', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    progressBar.next();
    expect(progressBar.value).toBe(1);
  });

  it('keeps the maximum value when next is called and it is already at the maximum', () => {
    const progressBar = new ProgressBar(0, 5, 5);
    progressBar.next();
    expect(progressBar.value).toBe(progressBar.maximum);
  });

  it('decrements value when previous is called', () => {
    const progressBar = new ProgressBar(0, 5, 5);
    progressBar.previous();
    expect(progressBar.value).toBe(4);
  });

  it('keeps the minimum value when previous is called and it is already at the minimum', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    progressBar.previous();
    expect(progressBar.value).toBe(progressBar.minimum);
  });
});
