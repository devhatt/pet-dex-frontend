import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vanilla';
import UploadImage from '.';

const renderUploadImage = () => render(new UploadImage());

describe('UploadImage', () => {
  it('renders correctly', () => {
    renderUploadImage();
    const uploadInput = screen.getByTestId('upload-input');

    expect(uploadInput).toBeInTheDocument();
  });
});
