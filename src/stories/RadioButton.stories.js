import RadioButton from '../components/RadioButton';

export default {
  title: 'Components/RadioButton',
  render: (args) => {
    const button = new RadioButton(args);
    const $container = document.createElement('div');
    button.mount($container);

    return $container;
  },
  argTypes: {
    value: { control: 'number', default: 1 },
    text: { control: 'text', default: '' },
    check: { control: 'boolean', default: false },
    name: { control: 'text', default: '' },
  },
};

export const Default = {
  args: {
    value: 1,
    text: 'Radio Button Example',
    check: false,
    name: 'Example',
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
