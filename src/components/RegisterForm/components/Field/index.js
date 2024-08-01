import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'label:changed',
  'error:message',
  'content:changed',
  'error:visible',
  'error:resolved',
];

const html = `
    <div class="field" data-select="field">
      <label class="field__label" data-select="field-label"></label>
      <div class="field__input" data-select="field-input"></div>
      <span class="field__error" data-select="field-error"></span>
    </div>
`;

export default function Field({ label = '', error = '', content } = {}) {
  Component.call(this, { html, events });
  this.setLabel(label);
  this.setError(error);
  this.setContent(content);
}

Field.prototype = Object.assign(Field.prototype, Component.prototype, {
  getLabel() {
    return this.selected.get('field-label').innerText;
  },

  setLabel(label = '') {
    this.selected.get('field-label').innerText = label;
    this.emit('label:changed', label);
  },

  getError() {
    return this.selected.get('field-error').innerText;
  },

  setError(error = '') {
    this.selected.get('field-error').innerText = error;
    this.emit('error:message', error);
  },

  showError(error) {
    this.selected.get('field-error').classList.add('field__error--show-error');
    this.emit('error:visible', error);
  },

  resolveError(error) {
    this.selected
      .get('field-error')
      .classList.remove('field__error--show-error');
    this.emit('error:resolved', error);
  },

  getContent() {
    return this.content;
  },

  setContent(content) {
    if (content?.mount == null) return;

    this.content = content;
    this.content.mount(this.selected.get('field-input'));
    this.emit('content:changed', this.content);
  },
});
