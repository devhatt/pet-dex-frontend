import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '/configuracoes',
  element: () => {
    console.log('Configuracoes', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'orange';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye Configuracoes Page');
    });
    return $content;
  },
};
