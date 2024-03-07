import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change'];

const html = `
<label class="radio-container">
    <input data-select="radioButton" type="radio" name="" value="">
    <span data-select="radioButtonText" class="radio-dot"></span>
</label>
`;

export default function RadioButton({ isChecked = false, text = '', value = '', name = '' } = {}) {
    Component.call(this, { html, events });

    this.setChecked(isChecked);
    this.setText(text);
    this.setValue(value);
    this.setName(name);

    const $radioButton = this.selected.get('radioButton');
    const $radioButtonText = this.selected.get('radioButtonText');

    $radioButton.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        this.setChecked(isChecked);
    });
}

RadioButton.prototype = Object.assign(RadioButton.prototype, Component.prototype, {
    isChecked() {
        return this.selected.get('radioButton').checked;
    },

    setChecked(isChecked = false) {
        const $radioButton = this.selected.get('radioButton');
        $radioButton.checked = isChecked;
        this.emit("change", isChecked);
    },

    setText(text = '') {
        const $radioButtonText = this.selected.get('radioButtonText');
        $radioButtonText.textContent = text;
        this.emit("text:change", text);
    },

    setValue(value = '') {
        const $radioButton = this.selected.get('radioButton');
        $radioButton.value = value;
        this.emit("value:change", value);
    },

    getName() {
        const $radioButton = this.selected.get('radioButton');
        return $radioButton.name;
    },

    setName(name = '') {
        const $radioButton = this.selected.get('radioButton');
        $radioButton.name = name;
        this.emit("name:change", name);
    }
});
