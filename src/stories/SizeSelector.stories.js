import SizeSelector from '../components/SizeSelector';

export default {
  title: 'Components/SizeSelector',
  render: () => {
    const sizeselector = new SizeSelector();

    const $container = document.createElement('div');
    $container.style.width = '100%';
    $container.style.display = 'flex';
    $container.style.justifyContent = 'center';
    sizeselector.mount($container);

    return $container;
  },
};

export const Default = {};
