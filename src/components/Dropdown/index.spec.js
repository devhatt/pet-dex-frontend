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
  cssClass: 'dropdown',
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
  });

  it('selects an item by value', () => {
    dropdown.setValue('soninho');

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Soninho');
    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('adds an element to the options', () => {
    const mockAdditionalItem = {
      label: 'Additional Item',
      value: 'additionalItem',
    };

    dropdown.addItem(mockAdditionalItem);

    expect(dropdown.selected.get('dropdown-options').children.length).toBe(4);
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

  it('closes when selecting item', () => {
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Soninho');

    fireEvent.click(item);

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('closes when clicked in toggle', () => {
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);
    dropdown.selected.get('dropdown-toggle').dispatchEvent(clickEvent);

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('has the placeholder', () => {
    expect(dropdown.selected.get('dropdown-selected').textContent).toBe(propsMock.placeholder);
  });

  it('has the custom class', () => {
    expect(dropdown.selected.get('dropdown-container').classList).toContain(propsMock.cssClass);
  });

  it('opens when calling the method', () => {
    dropdown.open();

    expect(dropdown.selected.get('dropdown-container').classList).toContain('dropdown--open');
  });

  it('closes when calling the method', () => {
    dropdown.open();
    dropdown.close();

    expect(dropdown.selected.get('dropdown-container').classList).not.toContain('dropdown--open');
  });

  it('has the text when calling the method', () => {
    dropdown.setText('Age');

    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Age');
  });

  it('get the text when calling the method', () => {
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Soninho');

    fireEvent.click(item);

    dropdown.getText();
    expect(dropdown.selected.get('dropdown-selected').textContent).toBe('Soninho');
  });

  it('has the value when calling the method', () => {
    dropdown.setValue('raiva');

    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe('raiva');
  });

  it('get the value when calling the method', () => {
    const item = getByText(dropdown.selected.get('dropdown-options'), 'Raiva');

    fireEvent.click(item);

    expect(dropdown.selected.get('dropdown-selected').dataset.value).toBe('raiva');
  });

  it('clear all itens', () => {
    dropdown.clearItems();

    expect(dropdown.selected.get('dropdown-options').children.length).toBe(0);
  });
});
