import Dropdown from '../components/Dropdown';

const mockItems = [
  {
    text: 'Raiva',
    value: 'raiva',
  },
  {
    text: 'Soninho',
    value: 'soninho',
  },
  {
    text: 'Castração',
    value: 'castracao',
  },
];

export default {
  title: 'Components/Dropdown',
  render: (args) => {
    const dropdown = new Dropdown(args);
    const $container = document.createElement('div');
    dropdown.mount($container);

    return $container;
  },
  argsTyes: {
    items: { control: 'object', defaultValue: [] },
    placeholder: { control: 'text', defaultValue: '' },
  },
};

export const Default = {
  args: {
    items: [],
    placeholder: '',
  },
};

export const Fill = {
  args: {
    items: mockItems,
    placeholder: 'Selecione',
  },
};
