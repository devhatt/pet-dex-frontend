import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import Slinding from '.';

const $slide1 = document.createElement('div');
$slide1.style.height = '200px';
$slide1.style.backgroundColor = 'red';
$slide1.textContent = 'slide 1';

const $slide2 = document.createElement('div');
$slide2.style.height = '200px';
$slide2.style.backgroundColor = 'pink';
$slide2.textContent = 'slide 2';

const $slide3 = document.createElement('div');
$slide3.style.height = '200px';
$slide3.style.backgroundColor = 'green';
$slide3.textContent = 'slide 3';

const $slide4 = document.createElement('div');
$slide4.style.height = '200px';
$slide4.style.backgroundColor = 'black';
$slide4.textContent = 'slide 4';

const propsMock = {
  slides: [$slide1, $slide2, $slide3],
};

const makeSut = (parameters) => render(new Slinding(parameters));

describe('Sliding', () => {
  describe('when mount', () => {
    it('render with 3 itens', async () => {
      makeSut(propsMock);
      const slide1 = await screen.findByText('slide 1');
      const slide2 = await screen.findByText('slide 2');
      const slide3 = await screen.findByText('slide 3');

      expect(slide1).toBeInTheDocument();
      expect(slide2).toBeInTheDocument();
      expect(slide3).toBeInTheDocument();
    });
  });

  describe('when call functions', () => {
    it('add item programmatically', async () => {
      const sliding = makeSut(propsMock);
      sliding.add($slide4);

      const slide4 = await screen.findByText('slide 4');

      expect(slide4).toBeInTheDocument();
    });

    it('remove item programmatically', async () => {
      const sliding = makeSut(propsMock);
      sliding.remove($slide2);

      const slide2 = screen.queryByText('slide 2');

      expect(slide2).not.toBeInTheDocument();
    });

    it('next item programmatically', async () => {
      const sliding = makeSut(propsMock);

      const slide1 = await screen.findByText('slide 1');
      expect(slide1).toHaveClass('sliding__content__slide--active');

      sliding.next();

      const slide2 = await screen.findByText('slide 2');
      expect(slide2).toHaveClass('sliding__content__slide--active');
    });

    it('previous item programmatically', async () => {
      const sliding = makeSut(propsMock);

      const slide1 = await screen.findByText('slide 1');
      expect(slide1).toHaveClass('sliding__content__slide--active');

      sliding.prev();

      const slide3 = await screen.findByText('slide 3');
      expect(slide3).toHaveClass('sliding__content__slide--active');
    });

    it('clear items programmatically', () => {
      const sliding = makeSut(propsMock);
      sliding.clear();

      const slide1 = screen.queryByText('slide 1');
      const slide2 = screen.queryByText('slide 2');
      const slide3 = screen.queryByText('slide 3');

      expect(slide1).not.toBeInTheDocument();
      expect(slide2).not.toBeInTheDocument();
      expect(slide3).not.toBeInTheDocument();
    });
  });

  describe('when unmount', () => {
    it('clear items', () => {
      const element = makeSut(propsMock);
      const sliding = screen.getByTestId('sliding-content');

      const slidingSpy = vi.spyOn(sliding, 'removeEventListener');

      element.unmount();

      expect(slidingSpy).toHaveBeenCalled();
    });
  });
});
