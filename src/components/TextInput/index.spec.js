import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import TextInput from '.';

const propsMock = {
  id: 'teste',
  placeholder: 'Escreva alguma coisa',
  assetUrl: '',
  assetPosition: 'prefix',
  variation: 'standard',
  value: 'Alguma coisa',
  type: 'text',
};

const renderTextInput = (parameters) => render(new TextInput(parameters));

describe('TextInput', () => {
  it('renders with props', () => {
    renderTextInput(propsMock);
    const placeholder = screen.getByPlaceholderText('Escreva alguma coisa');

    expect(placeholder).toBeInTheDocument();
  });

  it('renders without props', () => {
    renderTextInput();
    const placeholder = screen.getByRole('textbox');

    expect(placeholder).toBeInTheDocument();
  });
});
