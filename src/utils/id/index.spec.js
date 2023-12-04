import { describe, expect, it } from 'vitest';
import createIDFactory from '.';

describe('id', () => {
  it('should generators with different prefixes starts in 1', () => {
    const prefix1 = 'prefix-one';
    const prefix2 = 'prefix-two';

    const generator1 = createIDFactory(prefix1);
    const generator2 = createIDFactory(prefix2);

    expect(generator1).not.toBe(generator2);

    expect(generator1()).toBe(`${prefix1}-1`);
    expect(generator1()).toBe(`${prefix1}-2`);

    expect(generator2()).toBe(`${prefix2}-1`);
    expect(generator2()).toBe(`${prefix2}-2`);
  });

  it('should return the same instance for the same prefix', () => {
    const prefix = 'sameInstance';
    const generator1 = createIDFactory(prefix);
    const generator2 = createIDFactory(prefix);

    expect(generator1).toBe(generator2);
  });
});
