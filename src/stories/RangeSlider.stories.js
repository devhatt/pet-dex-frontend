import RangeSlider from '../components/RangeSlider';

export default {
  title: 'Components/RangeSlider',
  render: (args) => {
    const rangeSlider = new RangeSlider(args);
    const $container = document.createElement('div');
    rangeSlider.mount($container);
    return $container;
  },
  argTypes: {
    minimum: { control: 'number', default: 0 },
    maximum: { control: 'number', default: 100 },
  },
};

export const Default = {
  args: {
    minimum: 0,
    maximum: 100,
  },
};
