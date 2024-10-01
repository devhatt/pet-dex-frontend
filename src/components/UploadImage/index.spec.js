import { describe, expect, it } from 'vitest';
import { render, screen, userEvent, waitFor } from '@testing-library/vanilla';
import UploadImage from '.';
import plusIcon from './img/plus-icon.svg';
import photoIcon from './img/photo-icon.svg';

const renderUploadImage = () => render(new UploadImage());

describe('UploadImage', () => {
  it('renders correctly', () => {
    renderUploadImage();
    const uploadInput = screen.getByLabelText('Carregar imagem');

    expect(uploadInput).toBeInTheDocument();
  });

  describe('Upload input', () => {
    it('file loaded', async () => {
      renderUploadImage();
      const user = userEvent.setup();

      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      const uploadInput = screen.getByLabelText('Carregar imagem');

      await user.upload(uploadInput, file);

      expect(uploadInput.files[0]).toBe(file);
    });
  });

  describe('Button icon', () => {
    it('renders with the correct initial icon', async () => {
      renderUploadImage();
      const buttonIcon = screen.getByAltText('Botão com ícone');

      expect(buttonIcon).toHaveAttribute('src', plusIcon);
    });

    it('changes icon after file upload', async () => {
      renderUploadImage();
      const user = userEvent.setup();

      const uploadInput = screen.getByLabelText('Carregar imagem');
      const buttonIcon = screen.getByAltText('Botão com ícone');
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      await user.upload(uploadInput, file);

      await waitFor(() => {
        expect(buttonIcon).toHaveAttribute('src', photoIcon);
      });
    });
  });

  describe('Image preview', () => {
    it('does not display preview if no file is selected', () => {
      renderUploadImage();
      const imagePreview = screen.getByAltText('Imagem carregada');

      expect(imagePreview).toHaveClass('hidden');
    });

    it('display preview if file is selected', async () => {
      renderUploadImage();
      const user = userEvent.setup();

      const imagePreview = screen.getByAltText('Imagem carregada');
      const uploadInput = screen.getByLabelText('Carregar imagem');
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      await user.upload(uploadInput, file);
      await waitFor(() => {
        expect(imagePreview).toBeInTheDocument();
      });
    });
  });
});
