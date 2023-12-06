export default function Storage(name, initialValue) {
  this.name = name;
  this.initial_value = initialValue;
  this.value = JSON.parse(localStorage.getItem(name)) || initialValue;
  this.events = {
    onChange: new Set(),
  };
}

Storage.prototype = Object.assign(Storage.prototype, {
  setValue(value) {
    this.value = value;
    localStorage.setItem(this.name, JSON.stringify(this.value));
    this.events.onChange.forEach((callback) => callback(value));
  },

  getValue() {
    return this.value;
  },

  reset() {
    this.setValue(this.initial_value);
  },
});
