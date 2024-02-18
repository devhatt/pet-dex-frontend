import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/navigation';
// import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import Slider from '../components/slider';
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
  const slider = new Slider('slider-wrapper', 'slider-wrapper__slide');
  slider.mount($content);
});
