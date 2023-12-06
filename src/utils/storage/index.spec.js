import { beforeEach, describe, expect, it, vi } from 'vitest';
import Storage from '.';

describe('storage', () => {
  const initialValue = { updated: false };
  const storage = new Storage('test-storage', initialValue);

  beforeEach(() => {
    storage.reset();
    storage.events.onChange.clear();
    vi.restoreAllMocks();
  });

  describe('when initialize', () => {
    it('has the initial value', () => {
      expect(storage.getValue()).toBe(initialValue);
    });
  });

  describe('when set a new value and re-initialize', () => {
    it('has the updated value', () => {
      const newValue = { updated: true };
      storage.setValue(newValue);
      expect(storage.getValue()).toBe(newValue);

      const newStorage = new Storage('test-storage', initialValue);
      expect(newStorage.getValue()).toStrictEqual(newValue);
    });
  });

  describe('when reset the value', () => {
    it('has the strict initial value', () => {
      const newValue = { updated: true };
      storage.setValue(newValue);
      expect(storage.getValue()).toBe(newValue);

      storage.reset();
      expect(storage.getValue()).toBe(initialValue);

      const newStorage = new Storage('test-storage', initialValue);
      expect(newStorage.getValue()).toStrictEqual(initialValue);
    });
  });

  describe('when set a new value or reset the value', () => {
    it('calls the onchange event', () => {
      const spy = vi.fn();
      const newValue = { updated: true };
      storage.events.onChange.add(spy);
      storage.setValue(newValue);
      storage.reset();

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
