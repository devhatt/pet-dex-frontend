import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '@testing-library/vanilla';
import TextInput from '.';

const propsMock = {
  id: 'test',
  placeholder: 'Write something',
  assetUrl: '',
  assetPosition: 'prefix',
  variation: 'standard',
  value: 'Something',
  type: 'text',
};

const renderTextInput = (parameters) => render(new TextInput(parameters));

describe('TextInput', () => {
  it('renders with props', () => {
    renderTextInput(propsMock);
    const textInput = screen.getByPlaceholderText(propsMock.placeholder);

    expect(textInput).toBeInTheDocument();
  });

  it('renders without props', () => {
    renderTextInput();
    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeInTheDocument();
  });

  it('sets placeholder correctly', () => {
    renderTextInput({ placeholder: 'Write something' });
    const textInput = screen.getByPlaceholderText('Write something');

    expect(textInput.placeholder).toBe('Write something');
  });

  it('sets value correctly', () => {
    renderTextInput({ value: 'Something' });
    const textInput = screen.getByRole('textbox');

    expect(textInput.value).toBe('Something');
  });

  it('changes input value', async () => {
    renderTextInput();
    const textInput = screen.getByRole('textbox');

    await userEvent.type(textInput, 'New value');

    expect(textInput.value).toBe('New value');
  });

  it('toggles password visibility', async () => {
    renderTextInput({ type: 'password', placeholder: 'Write something' });
    const textInput = screen.getByPlaceholderText('Write something');
    const toggleButton = screen.getByRole('button');

    expect(textInput.type).toBe('password');

    await userEvent.click(toggleButton);
    expect(textInput.type).toBe('text');

    await userEvent.click(toggleButton);
    expect(textInput.type).toBe('password');
  });

  it('disables and enables input correctly', () => {
    const textInput = renderTextInput();
    const element = screen.getByRole('textbox');

    expect(element).toBeEnabled();

    textInput.disable();
    expect(element).toBeDisabled();

    textInput.enable();
    expect(element).toBeEnabled();
  });
});
