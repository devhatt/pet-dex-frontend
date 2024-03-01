import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change'];

const html = `
    <label class="checkbox-container">
        <input data-select="checkbox" type="checkbox" value="">
        <span data-select="checkbox-text" class="checkmark"></span>
    </label>
`;

export default function Checkbox({ isChecked = false, text = '', isDisabled = false, value = '' }) {
    Component.call(this, { html, events });

    this.setChecked(isChecked);
    this.setText(text);
    this.setDisabled(isDisabled);
    this.setValue(value);

    const $checkbox = this.selected.get('checkbox');
    const $checkboxText = this.selected.get('checkbox-text');

    $checkbox.addEventListener('change', () => {
        this.emit('change', $checkbox.checked);
    });
}

Checkbox.prototype = Object.assign(Checkbox.prototype, Component.prototype, {
    isChecked() {
        return this.selected.get('checkbox').checked;
    },

    setChecked(isChecked = false) {
        const $checkbox = this.selected.get('checkbox');
        $checkbox.checked = isChecked;
    },

    setText(text = '') {
        const $checkboxText = this.selected.get('checkbox-text');
        $checkboxText.textContent = text;
    }, 

    setDisabled(isDisabled = false) {
        const $checkbox = this.selected.get('checkbox');
        $checkbox.disabled = isDisabled;
    },

    setValue(value = '') {
        const $checkbox = this.selected.get('checkbox');
        $checkbox.value = value;
    }
});
