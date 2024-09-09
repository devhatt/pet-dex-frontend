import { describe, expect, it } from 'vitest';
import { render, screen, userEvent, waitFor } from '@testing-library/vanilla';
import PetWeightPage from '.';

const propsMock = {
  petPhoto: 'https://via.placeholder.com/150',
};

const makeComponent = (params) => render(new PetWeightPage(params));

describe('Pet Weight page', () => {
  it('renders image', async () => {
    const page = makeComponent(propsMock.petPhoto);

    render(page);
    const image = screen.getByAltText('Imagem carregada');

    expect(image).toBeInTheDocument();
  });

  it('KG radio is checked by default', () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const radioKG = screen.getByLabelText('KG');

    expect(radioKG.checked).toBe(true);
  });

  it('selects radio buttons when clicked and desselects the other', async () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const radioButtonKG = screen.getByLabelText('KG');
    const radioButtonLB = screen.getByLabelText('LB');

    await userEvent.click(radioButtonKG);
    expect(radioButtonKG).toBeChecked();
    expect(radioButtonLB).not.toBeChecked();

    await userEvent.click(radioButtonLB);
    expect(radioButtonLB).toBeChecked();
    expect(radioButtonKG).not.toBeChecked();
  });

  it('allows typing in the input field', async () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const input = screen.getByPlaceholderText('Peso');

    await userEvent.type(input, '5');

    expect(input).toHaveValue('5');
  });

  it('shows right value in slider when value changes in the input field', async () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const input = screen.getByPlaceholderText('Peso');
    const slider = screen.getByText('10.0');

    await userEvent.clear(input);
    await userEvent.type(input, '5');

    await waitFor(() => {
      expect(slider).toHaveTextContent('5.0');
    });
  });

  it('emits data when continue button is clicked', async () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const input = screen.getByPlaceholderText('Peso');
    const radioKG = screen.getByLabelText('KG');
    const continueButton = screen.getByRole('button', { name: 'Continuar' });

    await userEvent.clear(input);
    await userEvent.type(input, '5');
    await userEvent.click(radioKG);

    const mockEmit = vi.spyOn(page, 'emit');

    await userEvent.click(continueButton);

    expect(mockEmit).toHaveBeenCalledWith('submit', {
      weight: 5.0,
      weightUnit: 'kg',
    });
  });
});
