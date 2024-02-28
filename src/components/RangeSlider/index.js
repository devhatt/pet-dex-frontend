import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['change', 'interactionEnd'];

const html = `
  <div class="range-slider" data-select="range-slider">
    <h1 class="range-slider__value" data-select="range-slider-value">10 kg</h1>
    <div class="range-slider__content" data-select="range-slider-content">
      <button class="range-slider__button" data-select="range-slider-button">I I I</button>
    </div>
  </div>
`;

export default function RangeSlider({ minimum = 0, maximum = 100 }) {
  Component.call(this, { html, events });

  const valueElement = this.selected.get('range-slider-value');
  const containerElement = this.selected.get('range-slider-content');

  let isMouseDown = false;
  let startX = 0;
  let currentValue = Math.min(Math.max(10, minimum), maximum);
  const stepSize = 0.05;

  const handleStart = (clientX) => {
    isMouseDown = true;
    startX = clientX;
  };

  const handleMove = (clientX) => {
    if (!isMouseDown) return;

    const mouseX = clientX;
    const offsetX = mouseX - startX;

    containerElement.style.backgroundPositionX = `${parseInt(containerElement.style.backgroundPositionX || 0, 10) - offsetX}px`;

    currentValue =
      mouseX > startX
        ? Math.min(maximum, currentValue + stepSize)
        : Math.max(minimum, currentValue - stepSize);

    valueElement.textContent = `${currentValue.toFixed(1)} kg`;

    startX = mouseX;
    this.emit('change', currentValue);
  };

  const handleEnd = () => {
    isMouseDown = false;
    this.emit('interactionEnd', currentValue);
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    const clientX =
      event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    handleMove(clientX);
  };

  containerElement.addEventListener('mousedown', (event) => {
    event.preventDefault();
    handleStart(event.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
  });

  containerElement.addEventListener('touchstart', (event) => {
    event.preventDefault();
    handleStart(event.touches[0].clientX);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleEnd);
  });
}

RangeSlider.prototype = Object.assign(Object.create(Component.prototype), {
  constructor: RangeSlider,
});
