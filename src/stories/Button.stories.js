import Button from '../components/button';

export default {
  title: 'Components/Button',
  render: (args) => {
    const button = new Button(args);
    const $container = document.createElement('div');
    button.mount($container);

    return $container;
  },
  argTypes: {
    text: { control: 'text', default: '' },
    isFullWidth: { control: 'boolean', default: false },
  },
};

export const Default = {
  args: {
    text: 'Button',
  },
};

export const Full = {
  args: {
    ...Default.args,
    isFullWidth: true,
  },
};
