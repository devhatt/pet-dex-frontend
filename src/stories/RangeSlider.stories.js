import RangeSlider from '../components/RangeSlider';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  argTypes: {
    minimum: { control: 'number', default: 0 },
    maximum: { control: 'number', default: 100 },
    unit: { control: 'text', default: 'kg' },
  },
};

const Template = (args) => {
  const rangeSlider = new RangeSlider(args);
  const $container = document.createElement('div');
  rangeSlider.mount($container);
  return $container;
};

export const Default = Template.bind({});
Default.args = {
  minimum: 0,
  maximum: 100,
  unit: 'kg',
};
