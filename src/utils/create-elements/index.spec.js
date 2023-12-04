import { describe, expect, it } from 'vitest';
import createElements from '.';

describe('create-elements', () => {
  it('should return an empty array', () => {
    const html = '';
    const elements = createElements(html);

    expect(elements).toBeInstanceOf(Array);
    expect(elements.length).toBe(0);
  });

  it('should return an array with 2 elements', () => {
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
