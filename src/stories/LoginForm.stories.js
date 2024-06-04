import LoginForm from '../components/LoginForm';

export default {
  title: 'Components/LoginForm',
  parameters: {
    backgrounds: {
      default: 'petdex',
      values: [
        {
          name: 'default',
          value: '#F8F8F8',
        },
        {
          name: 'petdex',
          value: '#003459',
        },
      ],
    },
  },
  render: () => {
    const loginForm = new LoginForm();
    const $container = document.createElement('div');
    loginForm.mount($container);

    return $container;
  },
};

export const Default = {};
