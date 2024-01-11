import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['load', 'next', 'previous'];

const html = `
  <div class="progress-bar" data-select="progress-bar">
    <div class="progress-bar-background">
      <div class="progress-bar-foreground" data-select="progress-bar-foreground"></div>
    </div>
  </div>
`;

export default function ProgressBar(minimum, maximum, startValue = minimum) {
  Component.call(this, { html, events });
  this.minimum = minimum;
  this.maximum = maximum;
  this.value = startValue;
  this.load(startValue);
  this.selected.get('progress-bar').ariaValueMin = minimum;
  this.selected.get('progress-bar').ariaValueMax = maximum;
  this.selected.get('progress-bar').ariaValueNow = startValue;
}

ProgressBar.prototype = Object.assign(
  ProgressBar.prototype,
  Component.prototype,
  {
    getPercentile(value) {
      return `${
        ((value - this.minimum) / (this.maximum - this.minimum)) * 100
      }%`;
    },
    validValue(value) {
      return value >= this.minimum && value <= this.maximum;
    },
    load(value) {
      if (!this.validValue(value)) {
        return;
      }
      this.value = value;
      this.selected.get('progress-bar-foreground').style.width = this.getPercentile(this.value, this.minimum, this.maximum);
      this.selected.get('progress-bar').ariaValueNow = this.value;
    },
    next() {
      this.load(this.value + 1);
    },
    previous() {
      this.load(this.value - 1);
    },
  },
);
