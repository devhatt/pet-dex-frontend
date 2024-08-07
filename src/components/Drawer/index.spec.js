import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import { userEvent } from '@testing-library/user-event';
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

      const firstText = screen.getByText('Add dates');
      const secondText = screen.getByText('Cadastrar pet');

      expect(firstText).toBeInTheDocument();
      expect(secondText).toBeInTheDocument();
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

  it('closes when Esc is pressed', async () => {
    const drawer = makeSut();
    const closeSpy = vi.spyOn(drawer, 'close');

    await userEvent.keyboard('{Escape}');

    expect(closeSpy).toHaveBeenCalled();
  });

  it('closes when the close button is clicked', async () => {
    const drawer = makeSut();
    const closeSpy = vi.spyOn(drawer, 'close');

    drawer.open();

    const button = screen.getByLabelText('close-drawer');
    await userEvent.click(button);

    expect(closeSpy).toHaveBeenCalled();
  });
});
