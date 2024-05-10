import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/vanilla';
import { describe, expect, it } from 'vitest';
import Drawer from '.';
import Button from '../Button';

const makeSut = () => render(new Drawer({
  title: 'Add dates',
  content: new Button({
    text: 'Cadastrar pet',
    isFullWidth: true,
    isDisabled: false,
  }),
}))


describe('Drawer', () => {
  describe('when mount', () => {
    it('renders the title', () => {
      const drawer = makeSut()

      drawer.open();

      expect(drawer.selected.get('title').textContent).toBe('Add dates');
    });

    it('mount the content', () => {
      const drawer = makeSut();
      const mountSpy = vi.spyOn(drawer, 'mount')

      drawer.open()

      expect(mountSpy).toHaveBeenCalled();
    })
  });

  describe('when unmount', () => {
    it('remove event listeners', () => {
      const drawer = makeSut()
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const onEscapeKeySpy = vi.spyOn(drawer, 'onEscapeKey');

      drawer.open();
      drawer.emit('unmount');

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', onEscapeKeySpy);

      removeEventListenerSpy.mockRestore();
      onEscapeKeySpy.mockRestore();
    });
  });

  it('closes when Esc is pressed', () => {
    const drawer = makeSut()

    drawer.open();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(drawer.selected.get('drawer').classList).not.toContain(
      'drawer--open',
    );
  });

  it('closes when the close button is clicked', () => {
    const drawer = makeSut()

    drawer.open();

    fireEvent.click(drawer.selected.get('close'));

    expect(drawer.selected.get('drawer').classList).not.toContain(
      'drawer--open',
    );
  });
});
