import SizeSelector from '../components/SizeSelector';

export default {
  title: 'Components/SizeSelector',
  render: (args) => {
    const sizeselector = new SizeSelector();
    sizeselector.selectCard(
      sizeselector.$cards[args.selectCard],
      args.selectCard,
    );
    const $container = document.createElement('div');
    $container.style.width = '100%';
    $container.style.display = 'flex';
    $container.style.justifyContent = 'center';
    sizeselector.mount($container);

    return $container;
  },
  argTypes: {
    card: { control: 'number', default: 1 },
    selectCard: { control: 'number', default: 1 },
  },
};

export const Default = {
  args: {
    card: 1,
    selectCard: 1,
  },
};

export const CardText = {
  args: {
    ...Default.args,
    card: 1,
  },
};

export const CardSelect = {
  args: {
    ...Default.args,
    selectCard: 1,
  },
};
