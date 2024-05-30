import { extractElements } from 'pet-dex-utilities';
import mainRouter from '../router/main-router';
import { initializeSwiper } from '../utils/swiper';
import './index.scss';
import Navigation from './layouts/Navigation';
import SideMenu from './layouts/SideMenu';
import initializeScrollable from './utils/scrollable-sidemenu';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $home = selected.get('home');

  const $sidemenu = selected.get('sidemenu');
  const sideMenu = new SideMenu();
  sideMenu.mount($sidemenu);

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll('li');

  initializeScrollable($hamburgerMenu, $exitMenu, $itemsMenu, $home);
  initializeSwiper();
  mainRouter();
});
