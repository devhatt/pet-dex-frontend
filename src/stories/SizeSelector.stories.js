import SizeSelector from '../components/SizeSelector';

export default {
  title: 'Components/SizeSelector',
  render: (args) => {
    const sizeselector = new SizeSelector();
    sizeselector.setText(args.card, args.titleCard, args.subtitleCard);
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
    titleCard: { control: 'text', default: 'Medium' },
    subtitleCard: { control: 'text', default: 'under 14kg' },
    selectCard: { control: 'number', default: 1 },
  },
};

export const Default = {
  args: {
    card: 1,
    titleCard: 'Medium',
    subtitleCard: 'under 14kg',
    selectCard: 1,
  },
};

export const CardText = {
  args: {
    ...Default.args,
    card: 1,
    titleCard: 'Medium',
    subtitleCard: 'under 14kg',
  },
};

export const CardSelect = {
  args: {
    ...Default.args,
    selectCard: 1,
  },
};
