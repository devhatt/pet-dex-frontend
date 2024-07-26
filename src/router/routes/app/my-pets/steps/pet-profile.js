import NoPetRegirestedPage from '~src/layouts/app/pages/NoPetRegirested';

export default {
  pathname: '/pet-profile',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'blue';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
