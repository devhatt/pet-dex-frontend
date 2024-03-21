import Button from '../components/Button';
import Tabber from '../components/Tabber';
import iconBirthday from './assets/tabber/birthday.svg';
import iconHome from './assets/tabber/home.svg';

export default {
  title: 'Components/Tabber',
  render: (args) => {
    const tabber = new Tabber(args);
    const $container = document.createElement('div');
    tabber.mount($container);

    return $container;
  },
  argTypes: {
    tabs: { control: 'array', default: [] },
    activeTabOnInit: { control: 'number', default: 0 },
  },
};

export const Default = {
  args: {
    tabs: [
      {
        title: 'Aba 1',
        icon: iconHome,
        content: new Button({
          text: 'Cadastrar pet',
          isFullWidth: true,
          isDisabled: false,
        }),
      },
      {
        title: 'Aba 2',
        icon: iconBirthday,
        content: new Button({
          text: 'Excluir pet',
          isFullWidth: true,
          isDisabled: false,
        }),
      },
      {
        title: 'Aba 3',
        content: new Button({
          text: 'Editar pet',
          isFullWidth: true,
          isDisabled: false,
        }),
      },
      {
        title: 'Aba 4',
        content: new Button({
          text: 'Consultar pet',
          isFullWidth: true,
          isDisabled: false,
        }),
      },
    ],
    activeTabOnInit: 0,
  },
};
