import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '/doacoes',
  element: () => {
    console.log('Doacoes', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'brown';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye Doacoes Page');
    });
    return $content;
  },
};
