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
    check: { control: 'boolean', default: false },
    disabled: { control: 'boolean', default: false },
    name: { control: 'text', default: '' },
  },
};

export const Default = {
  args: {
    value: 1,
    text: 'Checkbox example',
    check: false,
    disabled: false,
    name: 'Example',
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
