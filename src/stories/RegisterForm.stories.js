import RegisterForm from '../components/RegisterForm/index';

export default {
  title: 'Components/RegisterForm',
  render: () => {
    const registerForm = new RegisterForm();
    const $container = document.createElement('div');
    registerForm.mount($container);

    return $container;
  },
  argTypes: {},
};

export const Default = {};
