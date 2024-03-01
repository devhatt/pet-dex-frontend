import Checkbox from '../components/Checkbox';

export default {
  title: 'Components/Checkbox',
  render: (args) => {
    const button = new Checkbox(args);
    const $container = document.createElement('div');
    button.mount($container);

    return $container;
  },
  argTypes: {
    value: { control: 'number', default: 1 },
    text: { control: 'text', default: '' },
    isChecked: { control: 'boolean', default: false },
    isDisabled: { control: 'boolean', default: false },
  },
};

export const Default = {
  args: {
    value: 1,
    text: 'Checkbox example',
    isChecked: false,
    isDisabled: false,
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};
