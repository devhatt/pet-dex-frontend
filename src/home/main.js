import { extractElements } from 'pet-dex-utilities';
import PetCard from '../components/PetCard';
import './index.scss';

const breed = ['Pug', 'Bulldog', 'Beagle', 'Rottweiler', 'Pastor Alemão'];
// eslint-disable-next-line prettier/prettier
const imgSrc = 'https://png.pngtree.com/png-clipart/20230506/original/pngtree-smiling-dogs-with-happy-expressions-png-image_9144389.png';
const cards = [];

function deactivatePreviousCard() {
  const allPetContainers = document.querySelectorAll('.pet-container');
  allPetContainers.forEach((container) => {
    container.classList.remove('pet-container--active');
  });
}

function renderCards(qty, $container) {
  for (let i = 0; i < qty; i += 1) {
    const card = new PetCard();
    cards.push(card);
    card.mount($container);
    card.setTitle(`${breed[i]}`);
    card.setImgSrc(imgSrc);
    card.listen('active', () => {
      deactivatePreviousCard(card);
      card.toggle();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $container = selected.get('container');

  renderCards(5, $container);
});
