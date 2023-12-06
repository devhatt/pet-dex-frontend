import extractElements from '../utils/extract-elements';
import Card from '../components/Card';
import './index.scss';

function renderCards(qty, $container) {
  for (let i = 0; i < qty; i++) {
    const card = new Card();
    card.mount($container);
    card.setTitle(`Card ${i}`);
    card.listen('purchase', () => {
      console.log(`purchase de quem usa o componente, esse é o card ${i}`);
    });

    const $card = card.selected.get('card-button');

    if (i === 2) {
      card.disable();
      $card.classList.add('card-container__button--disabled');
    } else {
      $card.classList.add('card-container__button--active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $container = selected.get('container');

  renderCards(5, $container);
});
