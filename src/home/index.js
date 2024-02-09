import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/Navigation';
import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

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

  function scrollTo(element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }

  function clickScroll(element, targetElement) {
    if (window.innerWidth < breakpointDesktop) {
      element.addEventListener('click', () => {
        scrollTo(targetElement);
      });
    }
  }

  function activeClassMenu(item, itemsMenu) {
    itemsMenu.forEach((element) => {
      element.classList.remove('side-menu-content__menuitens--active');
    });

    item.classList.add('side-menu-content__menuitens--active');

    if (window.innerWidth < breakpointDesktop) {
      scrollTo($navigation);
    }
  }

  clickScroll($hamburgerMenu, $sidemenu);
  clickScroll($exitMenu, $navigation);

  $itemsMenuHTML.forEach((item) => {
    item.addEventListener('click', () => {
      activeClassMenu(item, $itemsMenuHTML);
    });
  });

});
