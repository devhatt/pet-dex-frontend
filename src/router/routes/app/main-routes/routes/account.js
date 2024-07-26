import NoPetRegirestedPage from '~src/layouts/app/pages/NoPetRegirested';

export default {
  pathname: '/account',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'red';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
