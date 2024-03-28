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
    isChecked: { control: 'boolean', default: false },
    name: { control: 'text', default: '' },
  },
};

export const Default = {
  args: {
    value: 1,
    text: 'Radio Button Example',
    isChecked: false,
    name: 'Example',
  },
};
