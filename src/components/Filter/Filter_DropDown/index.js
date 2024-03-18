import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [];

const html = `
  <div class="filter__drop-down">
    
  </div>
`;

export default function FilterDropDown() {
  Component.call(this, { html, events });
}

FilterDropDown.prototype = Object.assign(
  FilterDropDown.prototype,
  Component.prototype,
  {
  },
);
