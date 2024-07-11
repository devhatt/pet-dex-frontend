import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'name:change',
  'placeholder:change',
  'maxLength:change',
  'required:change',
  'error',
];

const html = `
  <div class="textarea">
    <textarea class="textarea__input" data-select="textarea" rows="1" cols="1"></textarea>
    <span class="textarea__trigger" data-select="resize-trigger" contenteditable></span>
  </div>
`;

export default function TextArea({
  name = '',
  placeholder = '',
  maxLength,
  required = true,
}) {
  Component.call(this, { html, events });
  const $textarea = this.selected.get('textarea');
  const $resizeTrigger = this.selected.get('resize-trigger');

  this.setName(name);
  this.setPlaceholder(placeholder);
  this.setRequired(required);
  if (maxLength) this.setMaxLength(maxLength);

  function autoResize() {
    $resizeTrigger.innerText = $textarea.value;

    $textarea.style.height = 'auto';
    $textarea.style.height = `${$resizeTrigger.offsetHeight}px`;
  }

  this.listen('mount', () => {
    $textarea.addEventListener('focus', () =>
      $textarea.classList.remove('textarea__input--error'),
    );
    $textarea.addEventListener('input', autoResize);
    window.addEventListener('resize', autoResize);
  });

  this.listen('unmount', () => {
    $textarea.removeEventListener('focus', () =>
      $textarea.classList.remove('textarea__input--error'),
    );
    $textarea.removeEventListener('input', autoResize);
    window.removeEventListener('resize', autoResize);
  });
}

TextArea.prototype = Object.assign(TextArea.prototype, Component.prototype, {
  setName(name = '') {
    this.selected.get('textarea').name = name;
    this.emit('name:change', name);
  },
  setPlaceholder(placeholder = '') {
    this.selected.get('textarea').placeholder = placeholder;
    this.emit('placeholder:change', placeholder);
  },
  setMaxLength(maxLength) {
    const $textArea = this.selected.get('textarea');

    if (maxLength) $textArea.maxLength = maxLength;
    else $textArea.removeAttribute('maxlength');

    this.emit('maxLength:change', maxLength ?? Infinity);
  },
  setRequired(required = true) {
    this.selected.get('textarea').required = required;
    this.emit('required:change', required);
  },
  error() {
    this.selected.get('textarea').classList.add('textarea__input--error');
    this.emit('error');
  },
});
