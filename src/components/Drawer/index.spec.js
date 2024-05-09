import { fireEvent } from '@testing-library/dom';
import { describe, expect, it } from 'vitest';
import Button from '../Button';
import Drawer from './index';

const drawer = new Drawer({
  title: 'Add dates',
  content: new Button({
    text: 'Cadastrar pet',
    isFullWidth: true,
    isDisabled: false,
  }),
});

describe('Drawer', () => {
  describe('when mount', () => {
    it('renders the title', () => {
      drawer.open();

      expect(drawer.selected.get('title').textContent).toBe('Add dates');
    });
  });

  describe('when unmount', () => {
    it('remove event listeners', () => {
      // todo
    });
  });

  it('closes when Esc is pressed', () => {
    drawer.open();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(drawer.selected.get('drawer').classList).not.toContain(
      'drawer--open',
    );
  });

  it('closes when the close button is clicked', () => {
    drawer.open();

    fireEvent.click(drawer.selected.get('close'));

    expect(drawer.selected.get('drawer').classList).not.toContain(
      'drawer--open',
    );
  });

  // scroll com texto grande
});
