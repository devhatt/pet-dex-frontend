import { initializeSwiper } from '../utils/swiper';
import Sliding from '../components/Sliding';
import Button from '../components/Button';

const $slide1 = document.createElement('div');
$slide1.style.height = '200px';
$slide1.style.backgroundColor = 'red';

const $slide2 = document.createElement('div');
$slide2.style.height = '200px';
$slide2.style.backgroundColor = 'pink';

const $slide3 = document.createElement('div');
$slide3.style.height = '200px';
$slide3.style.backgroundColor = 'green';

const button4 = new Button({
  text: '<',
  isFullWidth: false,
});

const button5 = new Button({
  text: '>',
  isFullWidth: false,
});

export default {
  title: 'Components/Sliding',
  render: (args) => {
    const sliding = new Sliding(args);
    const $container = document.createElement('div');
    initializeSwiper();
    window.sliding = sliding;
    sliding.mount($container);
    button4.mount($container);
    button5.mount($container);

    button4.listen('click', () => sliding.previous());
    button5.listen('click', () => sliding.next());

    return $container;
  },
  argsTypes: {
    slides: { control: 'object', defaultValue: [] },
  },
};

export const Default = {
  args: {
    slides: [$slide1, $slide2, $slide3],
  },
};
