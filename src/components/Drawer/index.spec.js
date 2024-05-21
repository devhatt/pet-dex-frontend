/* eslint-disable testing-library/prefer-user-event */
/* eslint-disable no-restricted-syntax */
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/vanilla';
import { describe, expect, it } from 'vitest';
import Drawer from '.';
import Button from '../Button';

const makeSut = () =>
  render(
    new Drawer({
      title: 'Add dates',
      content: new Button({
        text: 'Cadastrar pet',
        isFullWidth: true,
        isDisabled: false,
      }),
    }),
  );

describe('Drawer', () => {
  describe('on mount', () => {
    it('renders', () => {
      const drawer = makeSut();

      drawer.open();

      expect(drawer.selected.get('title').textContent).toBe('Add dates');
      expect(drawer.selected.get('content').textContent).toBe('Cadastrar pet');
    });
  });

  describe('on unmount', () => {
    it('remove event listeners', () => {
      const drawer = makeSut();
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const onEscapeKeySpy = vi.spyOn(drawer, 'onEscapeKey');

      drawer.open();
      drawer.emit('unmount');

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        onEscapeKeySpy,
      );
    });
  });

  it('closes when Esc is pressed', () => {
    const drawer = makeSut();

    drawer.open();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(drawer.selected.get('drawer').classList).not.toContain(
      'drawer--open',
    );
  });

  it('closes when the close button is clicked', () => {
    const drawer = makeSut();
    const closeSpy = vi.spyOn(drawer, 'close');

    drawer.open();

    fireEvent.click(drawer.selected.get('close'));

    expect(closeSpy).toHaveBeenCalled();
  });
});
