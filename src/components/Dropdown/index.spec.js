import { describe, expect, it, beforeEach } from 'vitest';
import { fireEvent, getByText } from '@testing-library/dom';
import Dropdown from './index';

const propsMock = {
  items: [
    {
      text: 'Raiva',
      value: 'raiva',
    },
    {
      text: 'Soninho',
      value: 'soninho',
    },
    {
      text: 'Castração',
      value: 'castracao',
    },
  ],

  placeholder: 'Selecione',

};

describe('Dropdown', () => {
  let dropdown;
  let clickEvent;
  const $container = document.createElement('div');

  beforeEach(() => {
    dropdown = new Dropdown(propsMock);
    clickEvent = new Event('click');
    dropdown.mount($container);
  });

  it('has three item', () => {
    expect(dropdown.selected.get('dropdown-options').children.length).toBe(3);
  });

  it('opens the container when clicked', () => {
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);

    expect(dropdown.selected.get('dropdown-container').classList).toContain('dropdown--open');
  });

  it('selects an item when clicking', () => {
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Soninho');

    fireEvent.click(item);

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Soninho');
    expect(dropdown.selected.get('dropdown-selected').classList).not.toContain('dropdown__selected--placeholder');
    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('selects a item programmatically', () => {
    dropdown.setValue('soninho');

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Soninho');
    expect(dropdown.selected.get('dropdown-selected').classList).not.toContain('dropdown__selected--placeholder');
    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('adds an element to the options', () => {
    const mockAdditionalItem = {
      label: 'Additional Item',
      value: 'additionalItem',
    };

    dropdown.addItem(mockAdditionalItem);

    expect(dropdown.selected.get('dropdown-options').children[3].dataset.value).toBe(mockAdditionalItem.value);
    expect(dropdown.selected.get('dropdown-options').children.length).toBe(4);
    expect(() => dropdown.addItem(mockAdditionalItem)).toThrowError('Item already exists');
  });

  it('removes an element in options', () => {
    const itemForRemove = propsMock.items[1];
    dropdown.removeItem(itemForRemove.value);

    expect(dropdown.selected.get('dropdown-options').children.length).toBe(2);
  });

  it('closes when clicked outside', () => {
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);
    fireEvent.click(document.documentElement);

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('closes when clicked in toggle', () => {
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('has the placeholder', () => {
    expect(dropdown.selected.get('dropdown-selected').textContent).toBe(propsMock.placeholder);
    expect(dropdown.selected.get('dropdown-selected').classList).toContain('dropdown__selected--placeholder');
  });

  it('opens programmatically', () => {
    dropdown.open();

    expect(dropdown.selected.get('dropdown-container').classList).toContain('dropdown--open');
  });

  it('closes programmatically', () => {
    dropdown.open();
    dropdown.close();

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('get the value programmatically', () => {
    dropdown.open();
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Raiva');

    fireEvent.click(item);

    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe('raiva');
  });

  it('has the value programmatically', () => {
    dropdown.setValue('raiva');

    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe('raiva');
  });

  it('reset the value', () => {
    dropdown.setValue('soninho');
    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe('soninho');

    dropdown.reset();
    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe(undefined);
  });

  it('has the text label programmatically', () => {
    dropdown.setText('Age');

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Age');
    expect(dropdown.selected.get('dropdown-selected').classList).not.toContain('dropdown__selected--placeholder');
  });

  it('get the text label programmatically', () => {
    dropdown.open();
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Soninho');

    fireEvent.click(item);

    dropdown.getText();
    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Soninho');
  });

  it('get the placeholder programmatically', () => {
    const placeholder = dropdown.getPlaceholder();

    expect(placeholder).toBe(propsMock.placeholder);
  });

  it('has the placeholder programmatically', () => {
    dropdown.setPlaceholder('PetDex');

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('PetDex');
    expect(dropdown.selected.get('dropdown-selected').classList).toContain('dropdown__selected--placeholder');
  });

  it('clear all itens', () => {
    dropdown.clearItems();

    expect(dropdown.selected.get('dropdown-options').children.length).toBe(0);
  });
});
