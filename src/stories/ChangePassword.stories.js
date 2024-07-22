import ChangePassword from '../components/ChangePassword';
import { initializeSwiper } from '../utils/swiper';
import Drawer from '../components/Drawer';
import Button from '../components/Button';

export default {
  title: 'Components/ChangePassword',
  render: (args) => {
    initializeSwiper();
    const button = new Button({
      text: 'Abrir change password',
      isFullWidth: true,
      isDisabled: false,
    });

    const changePassword = new ChangePassword(args);
    const drawer = new Drawer({
      title: 'Alterar Senha',
      content: changePassword,
    });

    const $container = document.createElement('div');
    button.mount($container);

    button.listen('click', () => {
      drawer.open();
    });

    return $container;
  },
};

export const Default = {};
