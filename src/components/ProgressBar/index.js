import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['setProgress'];

const html = `
  <div class="progress-bar" data-select="progress-bar">
    <div class="progress-bar__background"></div>
    <div class="progress-bar__foreground" data-select="progress-bar-foreground"></div>
  </div>
`;

function isValueValid(value, minimum, maximum) {
  return value >= minimum && value <= maximum;
}

function getRatio(value, minimum, maximum) {
  return (value - minimum) / (maximum - minimum);
}

function getWidthFormated(value, minimum, maximum) {
  const ratio = getRatio(value, minimum, maximum);
  return `${ratio * 100}%`;
}

export default function ProgressBar(minimum, maximum, startValue = minimum) {
  Component.call(this, { html, events });
  this.minimum = minimum;
  this.maximum = maximum;
  this.currentProgress = isValueValid(startValue, this.minimum, this.maximum)
    ? startValue
    : this.minimum;

  this.setProgress(this.currentProgress);
  this.selected.get('progress-bar').ariaValueMin = this.minimum;
  this.selected.get('progress-bar').ariaValueMax = this.maximum;
  this.selected.get('progress-bar').ariaValueNow = this.currentProgress;
}

ProgressBar.prototype = Object.assign(
  ProgressBar.prototype,
  Component.prototype,
  {
    setProgress(value) {
      if (!isValueValid(value, this.minimum, this.maximum)) return;
      this.currentProgress = value;
      this.selected.get('progress-bar-foreground').style.width =
        getWidthFormated(this.currentProgress, this.minimum, this.maximum);
      this.selected.get('progress-bar').ariaValueNow = this.currentProgress;
      this.emit('setProgress', this.currentProgress);
    },
    next() {
      this.setProgress(this.currentProgress + 1);
    },
    prev() {
      this.setProgress(this.currentProgress - 1);
    },
  },
);
