import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import { userEvent } from '@testing-library/user-event';

import afghanHound from '../../../../stories/assets/petRegisterPage/afghanHound.svg';
import akita from '../../../../stories/assets/petRegisterPage/akita.svg';
import beagle from '../../../../stories/assets/petRegisterPage/beagle.svg';
import bichonFrise from '../../../../stories/assets/petRegisterPage/bichonFrise.svg';
import borderCollie from '../../../../stories/assets/petRegisterPage/borderCollie.svg';
import boxer from '../../../../stories/assets/petRegisterPage/boxer.svg';
import chowChow from '../../../../stories/assets/petRegisterPage/chowChow.svg';
import mixedBreed from '../../../../stories/assets/petRegisterPage/mixedBreed.svg';

import PetRegisterPage from './index';

const renderPetRegisterPage = (parameters) =>
  render(new PetRegisterPage(parameters));

const mockCards = [
  {
    title: 'Mixed Breed',
    imgSrc: mixedBreed,
    imgAlt: 'mixed breed',
  },
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Akita',
    imgSrc: akita,
    imgAlt: 'akita',
  },
  {
    title: 'Boxer',
    imgSrc: boxer,
    imgAlt: 'boxer',
  },
  {
    title: 'Beagle',
    imgSrc: beagle,
    imgAlt: 'beagle',
  },
  {
    title: 'Afghan Hound',
    imgSrc: afghanHound,
    imgAlt: 'afghan hound',
  },
  {
    title: 'Bichon Frise',
    imgSrc: bichonFrise,
    imgAlt: 'bichon frise',
  },
  {
    title: 'Chow Chow',
    imgSrc: chowChow,
    imgAlt: 'chow chow',
  },
  {
    title: 'Border Collie',
    imgSrc: borderCollie,
    imgAlt: 'border collie',
  },
];

describe('PetRegisterPage', () => {
  it('renders page with breeds', () => {
    renderPetRegisterPage({ cards: mockCards });

    const cardEvidence = screen.getByLabelText(/mixed breed/i);
    const button = screen.getByRole('button');

    expect(cardEvidence).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('selects the pet when it is clicked', async () => {
    renderPetRegisterPage({ cards: mockCards });

    const card = screen.getByLabelText(/mixed breed/i);
    await userEvent.click(card);

    expect(card).toHaveClass('pet-container--active');
  });

  it('deselects the pet when it is clicked again', async () => {
    renderPetRegisterPage({ cards: mockCards });

    const card = screen.getByLabelText(/mixed breed/i);
    await userEvent.click(card);
    await userEvent.click(card);

    expect(card).not.toHaveClass('pet-container--active');
  });

  it('deselects any previously selected card and selects the clicked one', async () => {
    renderPetRegisterPage({ cards: mockCards });

    const mixedBreedCard = screen.getByLabelText(/mixed breed/i);
    const afghanHoundCard = screen.getByLabelText(/afghan hound/i);
    await userEvent.click(mixedBreedCard);

    await userEvent.click(afghanHoundCard);

    expect(mixedBreedCard).not.toHaveClass('pet-container--active');
    expect(afghanHoundCard).toHaveClass('pet-container--active');
  });

  describe('emits', () => {
    it('emits the form data when every field is validated', async () => {
      const petRegisterPage = renderPetRegisterPage({ cards: mockCards });
      const callBackEmit = vi.fn();
      petRegisterPage.listen('submit', callBackEmit);

      const mixedBreedCard = screen.getByLabelText(/mixed breed/i);
      await userEvent.click(mixedBreedCard);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(callBackEmit).toHaveBeenCalledWith('Mixed Breed');
    });

    it('does not emit the form data when does not have card select', async () => {
      const petRegisterPage = renderPetRegisterPage({ cards: mockCards });
      const callBackEmit = vi.fn();
      petRegisterPage.listen('submit', callBackEmit);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(callBackEmit).not.toHaveBeenCalledWith('Mixed Breed');
    });
  });
});
