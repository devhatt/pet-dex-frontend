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
    unit: {
      control: {
        type: 'text',
        options: ['kg', 'lb'],
      },
      default: 'kg',
    },
    value: { control: 'number', default: 10 },
    stepSize: { control: 'number', default: 0.05 },
  },
};

export const Default = {
  args: {},
};

export const WithLbUnit = {
  args: {
    ...Default.args,
    unit: 'lb',
    value: 20,
  },
};
