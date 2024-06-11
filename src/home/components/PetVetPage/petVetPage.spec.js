import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import { userEvent } from '@testing-library/user-event';
import PetVetPage from './index';

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

  it('renders header', () => {
    renderPetVetPage(argsWithVaccine);
    const title = screen.getByText('Conte-nos um pouco mais do seu animal');
    const subtitle = screen.getByText(
      'Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele!',
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('renders cards', () => {
    renderPetVetPage(argsWithVaccine);
    const neuteredEvidence = screen.getByText('O seu pet amigo foi castrado?');
    const specialCareEvidence = screen.getByText('Cuidados especiais');

    expect(neuteredEvidence).toBeInTheDocument();
    expect(specialCareEvidence).toBeInTheDocument();
  });

  it('renders vaccine component without vaccines passed', () => {
    renderPetVetPage(argsWithVaccineEmpty);
    const vaccinesEvidence = screen.getByText('Vacinas');

    expect(vaccinesEvidence).toBeInTheDocument();
  });

  it('renders vaccine component with vaccines passed', () => {
    renderPetVetPage(argsWithVaccine);
    const vaccinesEvidence = screen.getByText('Vacinas');
    const someVaccineEvidence = screen.getByText(mockVaccines[0].title);

    expect(vaccinesEvidence).toBeInTheDocument();
    expect(someVaccineEvidence).toBeInTheDocument();
  });

  it('renders button component', () => {
    renderPetVetPage(argsWithVaccine);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.innerHTML === 'Concluir').toBeTruthy();
  });

  it('emits the form data', async () => {
    const petVetPage = renderPetVetPage(argsWithVaccine);
    const formExpected = {
      isNeutered: undefined,
      isSpecialCare: undefined,
      specialCareText: '',
      vaccines: mockVaccines,
    };

    const callBackEmit = vi.fn(() => formExpected);
    petVetPage.listen('submit', callBackEmit);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(callBackEmit).toHaveReturnedWith(formExpected);
  });
});
