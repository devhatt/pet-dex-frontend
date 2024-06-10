import NoPetRegirestedPage from '../../../../layouts/PetDexApp/pages/NoPetRegirested';

export default {
  pathname: '*',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.elements[0].textContent = 'ERRO 404!';
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
