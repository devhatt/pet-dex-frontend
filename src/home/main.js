import './index.scss';

import { extractElements } from 'pet-dex-utilities';

// import Card from '../components/Card';
import CardPet from '../components/more-info';

// function renderCards(qty, $container) {
//   for (let i = 0; i < qty; i += 1) {
//     const card = new Card();
//     card.mount($container);
//     card.setTitle(`Card ${i}`);
//     card.listen('purchase', () => {
//       console.log(`purchase de quem usa o componente, esse é o card ${i}`);
//     });

//     const $card = card.selected.get('card-button');

//     if (i === 2) {
//       card.disable();
//       $card.classList.add('card-container__button--disabled');
//     } else {
//       $card.classList.add('card-container__button--active');
//     }
//   }
// }

function renderCardMoreInfo($container) {
  const cardPet = new CardPet();
  cardPet.mount($container);
}

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $container = selected.get('container');
  // const $container2 = selected.get('container2');

  // renderCards(5, $container);
  renderCardMoreInfo($container);
});
