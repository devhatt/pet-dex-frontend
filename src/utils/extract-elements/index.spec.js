import { beforeEach, describe, it, vi } from 'vitest';
import extractElements from '.';

describe('extract-elements', () => {
  beforeEach(() => vi.restoreAllMocks());

  describe('when no elements are provided', () => {
    it('returns an empty map', () => {
      const selected = extractElements();
      expect(selected).toBeInstanceOf(Map);
      expect(selected.size).toBe(0);
    });
  });

  describe('when no element contains the selection attribute', () => {
    it('returns an empty map', () => {
      const elements = [document.createElement('div')];
      const selected = extractElements(elements, 'data-select');
      expect(selected).toBeInstanceOf(Map);
      expect(selected.size).toBe(0);
    });
  });

  describe('when element contains the selection attribute', () => {
    it('correctly extracts elements', () => {
      const div1 = document.createElement('div');
      div1.setAttribute('data-select', 'element-1');
      const p1 = document.createElement('p');
      div1.appendChild(p1);

      const div2 = document.createElement('div');
      div2.setAttribute('data-select', 'element-2');

      const p2 = document.createElement('p');
      p2.setAttribute('data-select', 'element-3');
      div2.appendChild(p2);

      /*
        <div data-select="element-1">
            <p></p>
        </div>
        <div data-select="element-2">
            <p data-select="element-3"></p>
        </div>
      */

      const elements = [div1, div2];
      const selected = extractElements(elements, 'data-select');
      expect(selected).toBeInstanceOf(Map);
      expect(selected.size).toBe(3);

      expect(selected.get('element-1')).toBe(div1);
      expect(selected.get('element-2')).toBe(div2);
      expect(selected.get('element-3')).toBe(p2);
    });
  });

  describe('when element contains the same selection attribute value', () => {
    it('warns the user about the duplication', () => {
      const warnSpy = vi.spyOn(console, 'warn');

      const div1 = document.createElement('div');
      div1.setAttribute('data-select', 'duplicated');

      const div2 = document.createElement('div');
      div2.setAttribute('data-select', 'duplicated');

      /*
        <div data-select="duplicated"></div>
        <div data-select="duplicated"></div>
      */

      const elements = [div1, div2];
      const selected = extractElements(elements, 'data-select');
      expect(selected).toBeInstanceOf(Map);
      expect(selected.size).toBe(1);
      expect(warnSpy).toHaveBeenCalled();
    });
  });
});
