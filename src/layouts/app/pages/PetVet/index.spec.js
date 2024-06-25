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
    it('confirms that neutered "no" radio will be selected when clicked', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const falseRadio = screen.getByLabelText('castrado-não');

      await userEvent.click(falseRadio);

      expect(falseRadio).toBeChecked();
    });

    it('confirms that special care "yes" radio will be selected when clicked', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const trueRadio = screen.getByLabelText('cuidados-especiais-sim');

      await userEvent.click(trueRadio);
      expect(trueRadio).toBeChecked();
    });

    it('confirms that both special care radios cannot be selected at the same time', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const falseRadio = screen.getByLabelText('cuidados-especiais-não');
      const trueRadio = screen.getByLabelText('cuidados-especiais-sim');

      await userEvent.click(falseRadio);
      expect(falseRadio).toBeChecked();
      expect(trueRadio).not.toBeChecked();

      await userEvent.click(trueRadio);
      expect(trueRadio).toBeChecked();
      expect(falseRadio).not.toBeChecked();
    });

    it('confirms that both neutered radios cannot be selected at the same time', async () => {
      renderPetVetPage(argsWithVaccineEmpty);

      const falseRadio = screen.getByLabelText('castrado-não');
      const trueRadio = screen.getByLabelText('castrado-sim');

      await userEvent.click(falseRadio);
      expect(falseRadio).toBeChecked();
      expect(trueRadio).not.toBeChecked();

      await userEvent.click(trueRadio);
      expect(trueRadio).toBeChecked();
      expect(falseRadio).not.toBeChecked();
    });
  });

  describe('vaccine component', () => {
    it('renders without vaccines list', () => {
      renderPetVetPage(argsWithVaccineEmpty);
      const vaccinesEvidence = screen.getByText('Vacinas');

      expect(vaccinesEvidence).toBeInTheDocument();
    });

    it('renders with vaccines list', () => {
      renderPetVetPage(argsWithVaccine);
      const vaccinesEvidence = screen.getByText('Vacinas');
      const someVaccineEvidence = screen.getByText(mockVaccines[0].title);

      expect(vaccinesEvidence).toBeInTheDocument();
      expect(someVaccineEvidence).toBeInTheDocument();
    });

    describe('emits', () => {
      it('emits the form data when every field is validated', async () => {
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

      it('does not emit the form data when special care radio are not check', async () => {
        const petVetPage = renderPetVetPage(argsWithVaccine);

        const callBackEmit = vi.fn();
        petVetPage.listen('submit', callBackEmit);

        const neuteredYesRadio = screen.getByLabelText('castrado-sim');
        await userEvent.click(neuteredYesRadio);

        const button = screen.getByRole('button');
        await userEvent.click(button);

        expect(callBackEmit).not.toHaveBeenCalled();
      });

      it('does not emit the form data when neutered radio are not check', async () => {
        const petVetPage = renderPetVetPage(argsWithVaccine);

        const callBackEmit = vi.fn();
        petVetPage.listen('submit', callBackEmit);

        const neuteredYesRadio = screen.getByLabelText(
          'cuidados-especiais-sim',
        );
        await userEvent.click(neuteredYesRadio);

        const button = screen.getByRole('button');
        await userEvent.click(button);

        expect(callBackEmit).not.toHaveBeenCalled();
      });

      it('does not emit the form data when no radio button is selected', async () => {
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
