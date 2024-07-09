import Textarea from '../components/TextArea';

export default {
  title: 'Components/TextArea',
  render: (args) => {
    const textarea = new Textarea(args);
    const $container = document.createElement('div');
    textarea.mount($container);

    return $container;
  },
  argTypes: {
    name: { control: 'text', default: '' },
    placeholder: { control: 'text', default: '' },
    maxLength: { control: 'number', default: 524288 },
    required: { control: 'boolean', default: true },
  },
};

export const Default = {
  args: {
    name: 'textarea',
    placeholder: 'Escreva o cuidado especial',
    required: true,
  },
};
