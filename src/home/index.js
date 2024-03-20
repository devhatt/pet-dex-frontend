import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/Navigation';
// import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import initializeScrollable from './utils/scrollable-sidemenu';
import './index.scss';
import SizeSelector from '../components/SizeSelector';

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
  const slider = new SizeSelector('selector-wrapper__slide');
  slider.mount($content);

  // const $content = selected.get('content');
  // const noPetRegirestedPage = new NoPetRegirestedPage();
  // noPetRegirestedPage.mount($content);

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll('li');

  initializeScrollable($hamburgerMenu, $exitMenu, $itemsMenu, $home);
});
