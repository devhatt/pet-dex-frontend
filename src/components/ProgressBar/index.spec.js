import { describe, expect, it } from 'vitest';
import ProgressBar from './index';

describe('ProgressBar', () => {
  it('should be a Function', () => {
    expect(ProgressBar).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    expect(new ProgressBar()).toBeInstanceOf(Object);
  });

  it('should initialize with a valid value', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    expect(progressBar.value).toBe(0);
  });

  it('should initialize with a especific valid value', () => {
    const progressBar = new ProgressBar(0, 5, 3);
    expect(progressBar.value).toBe(3);
  });

  it('should increment value when next is called', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    progressBar.next();
    expect(progressBar.value).toBe(1);
  });

  it('shouldn`t increment value when next is called', () => {
    const progressBar = new ProgressBar(0, 5, 5);
    progressBar.next();
    expect(progressBar.value).toBe(progressBar.maximum);
  });

  it('should increment value when next is called', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    progressBar.next();
    expect(progressBar.value).toBe(1);
  });

  it('shouldn`t increment value when next is called', () => {
    const progressBar = new ProgressBar(0, 5, 5);
    progressBar.next();
    expect(progressBar.value).toBe(progressBar.maximum);
  });

  it('should decrement value when previous is called', () => {
    const progressBar = new ProgressBar(0, 5, 5);
    progressBar.previous();
    expect(progressBar.value).toBe(4);
  });

  it('shouldn`t decrement value when previous is called', () => {
    const progressBar = new ProgressBar(0, 5, 10);
    progressBar.previous();
    expect(progressBar.value).toBe(progressBar.minimum);
  });
});
