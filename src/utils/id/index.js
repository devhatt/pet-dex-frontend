const map = new Map();

export default function createIDFactory(prefix, initialValue = 1) {
  if (map.has(prefix)) return map.get(prefix);

  function generate() {
    return `${prefix}-${initialValue++}`;
  }

  map.set(prefix, generate);

  return generate;
}
