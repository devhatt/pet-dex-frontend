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
  },
};

export const Default = {
  args: {
    tabs: [
      { title: 'Aba 1', icon: iconHome, content: 'Conteúdo da aba 1' },
      { title: 'Aba 2', icon: iconBirthday, content: 'Conteúdo da aba 2' },
      {
        title: 'Aba 3',
        content: new Button({
          text: 'Cadastrar pet',
          isFullWidth: true,
          isDisabled: false,
        }),
      },
      { title: 'Aba 4', content: 'Conteúdo da aba 4' },
    ],
  },
};
