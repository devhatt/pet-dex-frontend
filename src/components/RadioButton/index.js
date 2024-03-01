import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change'];

const html = `
<label class="radio-container">
    <input data-select="radio" type="radio" name="radio-group" value="">
    <span data-select="radio-text" class="radio-dot"></span>
</label>
`;

export default function RadioButton({ isChecked = false, text = '', value = '' }) {
    const updatedHtml = html.replace('value=""', `value="${value}"`);
    Component.call(this, { html: updatedHtml, events });

    this.setChecked(isChecked);
    this.setText(text);

    const $radioButton = this.selected.get('radio');
    const $radioText = this.selected.get('radio-text');

    $radioButton.addEventListener('change', () => {
        this.emit('change', $radioButton.checked);
    });
}

RadioButton.prototype = Object.assign(RadioButton.prototype, Component.prototype, {
    isChecked() {
        return this.selected.get('radio').checked;
    },

    setChecked(isChecked = false) {
        const $radioButton = this.selected.get('radio');
        $radioButton.checked = isChecked;
    },

    setText(text = '') {
        const $radioText = this.selected.get('radio-text');
        $radioText.textContent = text;
    },

    setValue(value = '') {
        const $radioButton = this.selected.get('radio');
        $radioButton.value = value;
    }
});
 