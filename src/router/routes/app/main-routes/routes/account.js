import CreateAccount from '~src/layouts/pages/CreateAccount';

export default {
  pathname: '/account',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const createAccount = new CreateAccount();
    createAccount.mount($content);
    return $content;
  },
};
