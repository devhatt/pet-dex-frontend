import LoginPage from '../layouts/app/pages/Login';

export default {
  title: 'Pages/Login',
  render: () => {
    const loginPage = new LoginPage();
    const $container = document.createElement('div');

    loginPage.mount($container);

    return $container;
  },
};

export const LoginPageStoryPage = {};
