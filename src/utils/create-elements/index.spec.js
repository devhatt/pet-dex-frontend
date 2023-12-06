import { describe, expect, it } from 'vitest';
import createElements from '.';

describe('create-elements', () => {
  describe('when executed without a valid string', () => {
    it('returns an empty array', () => {
      const html = '';
      const elements = createElements(html);

      expect(elements).toBeInstanceOf(Array);
      expect(elements.length).toBe(0);
    });
  });

  describe('when executed with a valid string', () => {
    it('returns an array with first level children', () => {
      const text = 'What we have for today?';
      const html = `
        <p>
          <span>Hello</span>
          <span>World</span>
        </p>
        <p>${text}</p>
      `;
      const elements = createElements(html);

      expect(elements).toBeInstanceOf(Array);
      expect(elements.length).toBe(2);
      expect(elements[1].textContent).toBe(text);
    });
  });
});
