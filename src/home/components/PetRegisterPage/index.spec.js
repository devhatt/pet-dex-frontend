import { describe, expect, it } from 'vitest';

import PetRegisterPage from './index';

describe('PetregisterPage', () => {
  it('renders correctly button', () => {});

  it('its a function', () => {
    expect(PetRegisterPage).toBeInstanceOf(Function);
  });

  it('its a function', () => {
    expect(new PetRegisterPage()).toBeInstanceOf(Object);
  });
});
