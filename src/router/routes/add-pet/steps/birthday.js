import NoPetRegirestedPage from '../../../../layouts/app/pages/NoPetRegirested';

export default {
  pathname: '/app/pet-birthday',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'brown';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
