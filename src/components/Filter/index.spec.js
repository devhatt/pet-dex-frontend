import { describe, expect, it, beforeEach } from 'vitest';
import Filter from './index';

describe('Filter', () => {
  it('is a Function', () => {
    expect(Filter).toBeInstanceOf(Function);
  });

  const filterOptions = {
    endpoint: '/api/filter-options',
    options: [
      {
        title: 'Option 1',
        type: 'checkbox',
        values: ['Option 1', 'Option 2', 'Option 3'],
      },
      {
        title: 'Option 2',
        type: 'radio',
        values: ['Option 1', 'Option 2', 'Option 3'],
      },
    ],
  };

  let filter;

  beforeEach(() => {
    filter = new Filter(filterOptions);
  });

  it('initializes with the correct properties', () => {
    expect(filter.filterOptions).toEqual(filterOptions);
    expect(filter.selectedValues).toEqual([]);
  });

  it('toggles dropdown display on button click', () => {
    expect(filter.dropDown.isVisible()).toBe(false);
    filter.selected.get('drop-down-button').dispatchEvent(new Event('click'));
    expect(filter.dropDown.isVisible()).toBe(true);
    filter.selected.get('drop-down-button').dispatchEvent(new Event('click'));
    expect(filter.dropDown.isVisible()).toBe(false);
  });
});
