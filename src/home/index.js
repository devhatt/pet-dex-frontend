import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/navigation';
// import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import SeletorDePorte from '../components/SeletorDePorte';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $sidemenu = selected.get('sidemenu');
  const sideMenu = new SideMenu();
  sideMenu.mount($sidemenu);

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  // const $content = selected.get('content');
  // const noPetRegirestedPage = new NoPetRegirestedPage();
  // noPetRegirestedPage.mount($content);

  const $content = selected.get('content');
  const seletor = new SeletorDePorte('slider-wrapper__slide');
  seletor.mount($content);
});
