import NoPetRegirestedPage from '../../../../layouts/pages/NoPetRegirestedPage';

export default {
  pathname: '/pet-size',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'purple';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
