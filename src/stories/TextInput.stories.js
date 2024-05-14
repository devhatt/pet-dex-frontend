import TextInput from '../components/TextInput/index';

export default {
  title: 'components/TextInput',

  render: (args) => {
    const input = new TextInput(args);
    const $container = document.createElement('div');
    input.mount($container);

    return $container;
  },
  argTypes: {
    placeholder: { control: 'text', default: '' },
    assetUrl: {},
    assetPosition: {},
    variation: {},
  },
};

export const Default = {
  args: {
    placeholder: 'email@petdex.com.br',
  },
};
