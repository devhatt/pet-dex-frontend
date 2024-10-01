import { describe, expect, it } from 'vitest';
import { render, screen, user } from '@testing-library/vanilla';
import Button from '.';

const makeSut = (parameters) => render(new Button(parameters));

describe('Button', () => {
  describe('when mount', () => {
    it('render with correct text', () => {
      makeSut({ text: 'content' });
      const text = screen.getByText('content');

      expect(text).toBeInTheDocument();
    });

    it('render disabled', () => {
      makeSut({ isDisabled: true });

      const element = screen.getByRole('button');

      expect(element).toBeDisabled();
    });

    it('render enabled', async () => {
      makeSut({ isDisabled: false });

      const button = screen.getByRole('button');

      expect(button).toBeEnabled();
    });
  });

  describe('when call [setIsFullWidth]', () => {
    it('append button--block class to button', async () => {
      const element = makeSut({ isFullWidth: false });
      element.setIsFullWidth(true);

      const button = screen.getByRole('button');

      expect(button).toHaveClass('button--block');
    });
  });

  describe('when click in the button', () => {
    it('should emit click', async () => {
      const element = makeSut();
      const onClick = vi.fn();
      element.listen('click', onClick);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('when call [click]', () => {
    it('should not emit click', async () => {
      const element = makeSut({ isDisabled: true });
      const onClick = vi.fn();
      element.listen('click', onClick);

      element.click();

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when unmount', () => {
    it('remove click eventListener', () => {
      const element = makeSut();
      const button = screen.getByRole('button');

      const buttonSpy = vi.spyOn(button, 'removeEventListener');

      element.unmount();

      expect(buttonSpy).toHaveBeenCalled();
    });
  });
});
