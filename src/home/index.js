import { extractElements } from 'pet-dex-utilities';
import { initializeSwiper } from '../utils/swiper';
import Navigation from './components/Navigation';
import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import './index.scss';
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

  const $content = selected.get('content');
  const noPetRegirestedPage = new NoPetRegirestedPage();
  noPetRegirestedPage.mount($content);

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll('li');

  initializeScrollable($hamburgerMenu, $exitMenu, $itemsMenu, $home);
  initializeSwiper();
});
