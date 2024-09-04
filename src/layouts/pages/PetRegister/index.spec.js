import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/vanilla';
import { describe, expect, it } from 'vitest';

import afghanHound from '~stories/assets/petRegisterPage/afghanHound.svg';
import akita from '~stories/assets/petRegisterPage/akita.svg';
import beagle from '~stories/assets/petRegisterPage/beagle.svg';
import mixedBreed from '~stories/assets/petRegisterPage/mixedBreed.svg';

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
    title: 'Beagle',
    imgSrc: beagle,
    imgAlt: 'beagle',
  },
  {
    title: 'Afghan Hound',
    imgSrc: afghanHound,
    imgAlt: 'afghan hound',
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
    const petRegister = renderPetRegisterPage({ cards: mockCards });
    const callback = vi.fn();

    petRegister.listen('select:card', callback);

    const card = screen.getByLabelText(/mixed breed/i);
    await userEvent.click(card);

    expect(callback).toHaveBeenCalled();
    expect(petRegister.activeCard).not.toBeNull();
  });

  it('deselects the pet when it is clicked again', async () => {
    const petRegister = renderPetRegisterPage({ cards: mockCards });

    const callback = vi.fn();

    petRegister.listen('select:card', callback);

    const card = screen.getByLabelText(/mixed breed/i);
    await userEvent.click(card);
    await userEvent.click(card);

    expect(petRegister.activeCard).toBeNull();
  });

  it('deselects any previously selected card and selects the clicked one', async () => {
    const petRegister = renderPetRegisterPage({ cards: mockCards });

    const selectCard = vi.fn();

    petRegister.listen('select:card', selectCard);

    const $afghanHoundCard = screen.getByLabelText(/afghan hound/i);
    const $mixedBreedCard = screen.getByLabelText(/mixed breed/i);

    await userEvent.click($afghanHoundCard);
    const mockAfghanHoundCard = petRegister.activeCard;

    await userEvent.click($mixedBreedCard);
    const mixedBreedCard = petRegister.activeCard;

    expect(petRegister.activeCard).not.toBe(mockAfghanHoundCard);
    expect(petRegister.activeCard).toBe(mixedBreedCard);
  });

  describe('emits', () => {
    it('form data when every field is validated', async () => {
      const petRegisterPage = renderPetRegisterPage({ cards: mockCards });
      const callBackEmit = vi.fn();
      petRegisterPage.listen('submit', callBackEmit);

      const mixedBreedCard = screen.getByLabelText(/mixed breed/i);
      await userEvent.click(mixedBreedCard);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(callBackEmit).toHaveBeenCalledWith({
        breedSelected: 'Mixed Breed',
      });
    });

    it('does not happen when theres no card selected', async () => {
      const petRegisterPage = renderPetRegisterPage({ cards: mockCards });
      const callBackEmit = vi.fn();
      petRegisterPage.listen('submit', callBackEmit);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(callBackEmit).not.toHaveBeenCalledWith('Mixed Breed');
    });
  });
});
