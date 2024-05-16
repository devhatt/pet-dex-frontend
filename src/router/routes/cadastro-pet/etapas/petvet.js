import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '/petvet',
  element: () => {
    console.log('PetVet', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'red';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye PetVet Page');
    });
    return $content;
  },
};
