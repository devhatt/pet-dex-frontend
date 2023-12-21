import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/navigation';
import NonePet from './components/none-pet';
import SideMenu from './components/side-menu';
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
  const nonePet = new NonePet();
  nonePet.mount($content);
});
