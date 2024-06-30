import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import PetWeightPage from '.';

const propsMock = {
  petPhoto: 'https://via.placeholder.com/150',
};

const makeComponent = (params) => render(new PetWeightPage(params));

describe.only('Pet Weight page', () => {
  it('renders image', async () => {
    const page = makeComponent(propsMock.petPhoto);

    render(page);
    const image = screen.getByAltText('Imagem carregada');

    expect(image).toBeInTheDocument();
  });

  it('renders title', () => {
    const page = makeComponent(propsMock.petPhoto);
    const componentTitle = 'Qual é o peso do seu animal de estimação?';

    render(page);
    const title = screen.getByRole('heading', { name: componentTitle });

    expect(title).toBeInTheDocument();
  });

  it('renders hint', () => {
    const page = makeComponent(propsMock.petPhoto);
    const componentHint = 'Ajuste de acordo com a realidade';

    render(page);
    const hint = screen.getByText(componentHint);

    expect(hint).toBeInTheDocument();
  });

  it('renders slider', () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const slider = screen.getByText('I I I');

    expect(slider).toBeInTheDocument();
  });

  it('renders weight input', () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const input = screen.getByPlaceholderText('Peso');

    expect(input).toBeInTheDocument();
  });

  it('renders continue button', () => {
    const page = makeComponent(propsMock.petPhoto);
    render(page);

    const button = screen.getByRole('button', { name: 'Continuar' });

    expect(button).toBeInTheDocument();
  });
});
