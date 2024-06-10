import NoPetRegirestedPage from '../../../../layouts/PetDexApp/pages/NoPetRegirested';

export default {
  pathname: '/pet-birthday',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'brown';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
