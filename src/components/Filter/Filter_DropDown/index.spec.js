import { describe, expect, it, beforeEach } from 'vitest';
import FilterDropDown from './index';

describe('FilterDropDown', () => {
  it('is a Function', () => {
    expect(FilterDropDown).toBeInstanceOf(Function);
  });

  const filterOptions = [
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
  ];

  let filterDropDown;

  beforeEach(() => {
    filterDropDown = new FilterDropDown(filterOptions);
  });

  it('initializes with the correct properties', () => {
    const $filterDropDown = filterDropDown.selected.get('drop-down');
    $filterDropDown.querySelectorAll('.filter__drop-down__title').forEach(($option, index) => {
      expect($option.innerHTML).toEqual(filterOptions[index].title);
    });

    expect($filterDropDown.querySelectorAll('.filter__drop-down__title').length).toEqual(filterOptions.length);
  });
});
