import NoPetRegirestedPage from '../../../../layouts/PetDexApp/pages/NoPetRegirested';

export default {
  pathname: '/pet-name',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'yellow';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
