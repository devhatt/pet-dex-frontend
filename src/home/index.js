import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/Navigation';
import PetRegisterPage from './components/PetRegisterPage';
import SideMenu from './components/SideMenu';
import initializeScrollable from './utils/scrollable-sidemenu';

import afghanHound from './components/PetRegisterPage/images/afghanHound.svg';
import akita from './components/PetRegisterPage/images/akita.svg';
import beagle from './components/PetRegisterPage/images/beagle.svg';
import bichonFrise from './components/PetRegisterPage/images/bichonFrise.svg';
import borderCollie from './components/PetRegisterPage/images/borderCollie.svg';
import boxer from './components/PetRegisterPage/images/boxer.svg';
import chowChow from './components/PetRegisterPage/images/chowChow.svg';
import mixedBreed from './components/PetRegisterPage/images/mixedBreed.svg';

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

  // const $content = selected.get('content');
  // const noPetRegirestedPage = new NoPetRegirestedPage();
  // noPetRegirestedPage.mount($content);

  const cards = [
    {
      title: 'Akita',
      imgSrc: akita,
      imgAlt: 'akita',
    },
    {
      title: 'Boxer',
      imgSrc: boxer,
      imgAlt: 'boxer',
    },
    {
      title: 'Beagle',
      imgSrc: beagle,
      imgAlt: 'beagle',
    },
    {
      title: 'Afghan Hound',
      imgSrc: afghanHound,
      imgAlt: 'afghan hound',
    },
    {
      title: 'Bichon Frise',
      imgSrc: bichonFrise,
      imgAlt: 'bichon frise',
    },
    {
      title: 'Chow Chow',
      imgSrc: chowChow,
      imgAlt: 'chow chow',
    },
    {
      title: 'Border Collie',
      imgSrc: borderCollie,
      imgAlt: 'border collie',
    },
    {
      title: 'Mixed Breed',
      imgSrc: mixedBreed,
      imgAlt: 'mixed breed',
    },
  ];

  const $content = selected.get('content');
  const petRegisterPage = new PetRegisterPage({ cards });
  petRegisterPage.mount($content);
  petRegisterPage.listen('select:card', (card) => {
    console.log('card da home: ', card.elements);
  });

  petRegisterPage.listen('submit-pet', (card) => {
    console.log('submit da home: ', card);
  });

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll('li');

  initializeScrollable($hamburgerMenu, $exitMenu, $itemsMenu, $home);
});
