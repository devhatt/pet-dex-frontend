import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '*',
  element: () => {
    console.log('Erro', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.elements[0].textContent = 'ERRO 404!';
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye Erro Page');
    });
    return $content;
  },
};
