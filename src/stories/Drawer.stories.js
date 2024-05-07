import Button from '../components/Button';
import Drawer from '../components/Drawer';
import { initializeSwiper } from '../utils/swiper';

export default {
  title: 'Components/Drawer',
  render: (args) => {
    initializeSwiper();
    const drawer = new Drawer(args);
    const button = new Button({
      text: 'Abrir drawer',
      isFullWidth: true,
      isDisabled: false,
    });
    const $container = document.createElement('div');
    button.mount($container);

    button.listen('click', () => {
      drawer.open();
    });

    return $container;
  },
  argTypes: {
    title: { control: 'text', description: 'Title of the drawer' },
    content: { control: null, description: 'Component inside drawer' },
  },
};

export const Default = {
  args: {
    title: 'Add dates',
    content: new Button({
      text: 'Cadastrar pet',
      isFullWidth: true,
      isDisabled: false,
    }),
  },
};
