import { describe, expect, it } from 'vitest';
import PetWeightPage from './index';

const propsMock = {
  petPhoto: 'https://via.placeholder.com/150',
};

describe('PetWeightPage', () => {
  it('is a Function', () => {
    expect(PetWeightPage).toBeInstanceOf(Function);
  });

  it.skip('returns an object', () => {
    expect(new PetWeightPage(propsMock)).toBeInstanceOf(Object);
  });
});
