import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import { userEvent } from '@testing-library/user-event';
import dayjs from 'dayjs';
import PetVetPage from './index';

function formatDate(date) {
  return date ? dayjs(date).format('MM/DD/YYYY') : '';
}

const mapVaccine = (vaccine) => ({
  id: vaccine.id,
  title: vaccine.title,
  date: formatDate(vaccine.date),
  veterinary: vaccine.veterinary,
});

describe('PetVetPage', () => {
  const mockVaccines = [
    {
      id: '1',
      veterinary: 'Dr octopus',
      title: 'Antirrábica',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      veterinary: 'Dr Felipa',
      title: 'Raiva',
      date: new Date(2023, 5, 2).toISOString(),
    },
    {
      id: '3',
      veterinary: 'Dr octopus',
      title: 'Raiva',
      date: new Date(2023, 2, 2).toISOString(),
    },
  ];
  const argsWithVaccine = { vaccines: mockVaccines };
  const argsWithVaccineEmpty = { vaccines: [] };
  const renderPetVetPage = (parameters) => render(new PetVetPage(parameters));

  it('renders the main container', () => {
    renderPetVetPage(argsWithVaccineEmpty);
    const title = screen.getByText('Conte-nos um pouco mais do seu animal');

    expect(title).toBeInTheDocument();
  });

  describe('radios form', () => {
    it('confirms if the neutering selection is correct', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const falseRadio = screen.getByLabelText('cuidados-especiais-não');
      const trueRadio = screen.getByLabelText('cuidados-especiais-sim');

      await userEvent.click(falseRadio);

      expect(falseRadio).toBeChecked();
      expect(trueRadio).not.toBeChecked();
    });

    it('confirms if the special care selection is correct', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const falseRadio = screen.getByLabelText('cuidados-especiais-não');
      const trueRadio = screen.getByLabelText('cuidados-especiais-sim');

      await userEvent.click(falseRadio);
      expect(falseRadio).toBeChecked();
      expect(trueRadio).not.toBeChecked();
    });
  });

  describe('vaccine component', () => {
    it('renders without vaccines passed', () => {
      renderPetVetPage(argsWithVaccineEmpty);
      const vaccinesEvidence = screen.getByText('Vacinas');

      expect(vaccinesEvidence).toBeInTheDocument();
    });

    it('renders with vaccines passed', () => {
      renderPetVetPage(argsWithVaccine);
      const vaccinesEvidence = screen.getByText('Vacinas');
      const someVaccineEvidence = screen.getByText(mockVaccines[0].title);

      expect(vaccinesEvidence).toBeInTheDocument();
      expect(someVaccineEvidence).toBeInTheDocument();
    });

    describe('emits', () => {
      it('emits the form data when every field is passed', async () => {
        const petVetPage = renderPetVetPage(argsWithVaccine);

        const neuteredYesRadio = screen.getByLabelText('castrado-sim');
        const specialCareYesRadio = screen.getByLabelText(
          'cuidados-especiais-sim',
        );

        await userEvent.click(neuteredYesRadio);
        await userEvent.click(specialCareYesRadio);

        const formExpected = {
          isNeutered: true,
          isSpecialCare: true,
          specialCareText: '',
          vaccines: mockVaccines.map(mapVaccine),
        };

        const callBackEmit = vi.fn();
        petVetPage.listen('submit', callBackEmit);

        const button = screen.getByRole('button');
        await userEvent.click(button);

        expect(callBackEmit).toHaveBeenCalledWith(formExpected);
      });

      it('does not emit the form data when radios are not check', async () => {
        const petVetPage = renderPetVetPage(argsWithVaccine);

        const callBackEmit = vi.fn();
        petVetPage.listen('submit', callBackEmit);

        const button = screen.getByRole('button');
        await userEvent.click(button);

        expect(callBackEmit).not.toHaveBeenCalled();
      });
    });
  });
});
