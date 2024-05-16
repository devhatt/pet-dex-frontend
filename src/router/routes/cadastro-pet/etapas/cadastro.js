import { Router, routeLocation } from 'vanilla-routing';
import NoPetRegirestedPage from '../../../../home/components/NoPetRegirestedPage';

export default {
  pathname: '/cadastropet',
  element: () => {
    console.log('Cadastro', routeLocation());
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'blue';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    const botao = noPetRegirestedPage.button;
    console.log(botao);
    noPetRegirestedPage.mount($content);
    Router.dispose(() => {
      console.log('Bye Cadastro Pet Page');
    });
    return $content;
  },
};
