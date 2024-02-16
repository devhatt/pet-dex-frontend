import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/navigation';
import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $home = selected.get('home');

  const $sidemenu = selected.get('sidemenu');
  const sideMenu = new SideMenu();
  sideMenu.mount($sidemenu);

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  const $content = selected.get('content');
  const noPetRegirestedPage = new NoPetRegirestedPage();
  noPetRegirestedPage.mount($content);
  
  const $hamburgerMenu = navigation.selected.get('hamburgerMenu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = Array.from(sideMenu.selected.get('menuitens').childNodes);
  const $itemsMenuHTML = $itemsMenu.filter((node) => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'li');
  const breakpointDesktop = 1024;

  function openMenu(hamburger, home) {
    if (window.innerWidth < breakpointDesktop) {
      hamburger.addEventListener('click', () => {
        home.classList.remove('home--exit-menu');
        home.classList.add('home--open-menu');
      });
    }
  }

  function exitMenu(exitMenu, home) {
    if (window.innerWidth < breakpointDesktop) {
      exitMenu.addEventListener('click', () => {
        home.classList.remove('home--open-menu');
        home.classList.add('home--exit-menu');
      });
    }
  }

  function activeClassMenu(item, itemsMenu, home) {
    itemsMenu.forEach((element) => {
      element.classList.remove('side-menu-content__menuitens--active');
    });

    item.classList.add('side-menu-content__menuitens--active');

    if (window.innerWidth < breakpointDesktop) {
      home.classList.remove('home--openMenu');
      home.classList.add('home--exitMenu');
    }
  }

  openMenu($hamburgerMenu, $home);
  exitMenu($exitMenu, $home);

  $itemsMenuHTML.forEach((item) => {
    item.addEventListener('click', () => {
      activeClassMenu(item, $itemsMenuHTML, $home);
    });
  });

});
