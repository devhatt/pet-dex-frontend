import SignUp from '../layouts/app/pages/SignUp';

export default {
  title: 'Pages/SignUp',
  render: () => {
    const signUp = new SignUp();
    const $container = document.createElement('div');

    signUp.mount($container);

    return $container;
  },
};

export const SignUpPageStory = {};
