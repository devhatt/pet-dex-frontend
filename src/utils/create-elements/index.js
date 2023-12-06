const div = document.createElement('div');

export default function createElements(html) {
  div.innerHTML = html;
  const elements = Array.from(div.children);
  div.innerHTML = '';

  return elements;
}
