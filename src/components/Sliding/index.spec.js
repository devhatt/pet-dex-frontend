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

describe('Slide', () => {
  describe('on mount', () => {
    it('renders with items passed by props', async () => {
      makeSut(propsMock);
      const slide1 = await screen.findByText('slide 1');
      const slide2 = await screen.findByText('slide 2');
      const slide3 = await screen.findByText('slide 3');

      expect(slide1).toBeInTheDocument();
      expect(slide2).toBeInTheDocument();
      expect(slide3).toBeInTheDocument();
    });
  });

  it('add item programmatically', async () => {
    const sliding = makeSut(propsMock);
    const slidingSpy = vi.spyOn(sliding, 'emit');

    sliding.add($slide4);

    const slide4 = await screen.findByText('slide 4');

    expect(slidingSpy).toHaveBeenCalledWith('slide:add', $slide4);
    expect(slide4).toBeInTheDocument();
  });

  it('remove item programmatically', () => {
    const sliding = makeSut(propsMock);
    const slidingSpy = vi.spyOn(sliding, 'emit');
    sliding.remove($slide2);

    const slide2 = screen.queryByText('slide 2');

    expect(slide2).not.toBeInTheDocument();
    expect(slidingSpy).toHaveBeenCalledWith('slide:remove', $slide2);
  });

  it('next item programmatically', () => {
    const sliding = makeSut(propsMock);
    const slidingSpy = vi.spyOn(sliding, 'emit');

    sliding.next();

    expect(slidingSpy).toHaveBeenCalledWith('slide:next', $slide2);
  });

  it('previous item programmatically', () => {
    const sliding = makeSut(propsMock);
    const slidingSpy = vi.spyOn(sliding, 'emit');

    sliding.prev();

    expect(slidingSpy).toHaveBeenCalledWith('slide:prev', $slide3);
  });

  it('clear items programmatically', () => {
    const sliding = makeSut(propsMock);
    const slidingSpy = vi.spyOn(sliding, 'emit');

    sliding.clear();

    const slide1 = screen.queryByText('slide 1');
    const slide2 = screen.queryByText('slide 2');
    const slide3 = screen.queryByText('slide 3');

    expect(slidingSpy).toHaveBeenCalledWith('slides:clear');
    expect(slide1).not.toBeInTheDocument();
    expect(slide2).not.toBeInTheDocument();
    expect(slide3).not.toBeInTheDocument();
  });

  describe('on unmount', () => {
    it('clear items', () => {
      const element = makeSut(propsMock);
      const sliding = screen.getByTestId('sliding-content');

      const slidingSpy = vi.spyOn(sliding, 'removeEventListener');

      element.unmount();

      expect(slidingSpy).toHaveBeenCalled();
    });
  });
});
