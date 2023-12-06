const SELECTOR = 'data-select';

export default function extractElements(
  elements = [],
  selection_attr = SELECTOR
) {
  return elements.reduce((accumulator, element) => {
    const treeWalker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_ELEMENT
    );

    do {
      const node = treeWalker.currentNode;
      const attrValue = node.getAttribute(selection_attr);
      if (!attrValue) continue;

      const nodeAlreadyExists = accumulator.has(attrValue);
      if (nodeAlreadyExists)
        console.warn(`duplicated element with selector value "${attrValue}"`);

      accumulator.set(attrValue, node);
    } while (treeWalker.nextNode());

    return accumulator;
  }, new Map());
}
