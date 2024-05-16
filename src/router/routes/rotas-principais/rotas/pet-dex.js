import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '/petdex',
  element: () => {
    console.log('Pet Dex', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'red';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye PetDex Page');
    });
    return $content;
  },
};
