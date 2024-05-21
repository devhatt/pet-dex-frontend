import { userEvent } from '@testing-library/user-event';
import { beforeEach } from 'vitest';

export * from '@testing-library/user-event';
export * from '@testing-library/dom';

// eslint-disable-next-line import/no-mutable-exports
export let user = userEvent.setup();

/**
 * @template T
 * @param {T} element
 * @returns {T}
 */
export const render = (element) => {
  element.mount(document.body);

  return element;
};

beforeEach(() => {
  user = userEvent.setup();
});
