import Sliding from '../components/Sliding';
import Button from '../components/Button';

const button = new Button({
  text: 'Bom dia',
  isFullWidth: true,
});

const $buttonContainer = document.createElement('div');
button.mount($buttonContainer);

const button2 = new Button({
  text: 'Tamo ai',
  isFullWidth: true,
});

const $button2Container = document.createElement('div');
button2.mount($button2Container);

const button3 = new Button({
  text: 'oi',
  isFullWidth: true,
});

const $button3Container = document.createElement('div');
button3.mount($button3Container);

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
    window.sliding = sliding;
    sliding.mount($container);
    button4.mount($container);
    button5.mount($container);

    $container.children[1].addEventListener('click', () => {
      sliding.prev();
    });
    $container.children[2].addEventListener('click', () => {
      sliding.next();
    });

    return $container;
  },
  argsTypes: {
    slides: { control: 'object', defaultValue: [] },
  },
};

export const Default = {
  args: {
    slides: [$buttonContainer, $button2Container, $button3Container],
  },
};
