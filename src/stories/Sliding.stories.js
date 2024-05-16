import Sliding from '../components/Sliding';
import Button from '../components/Button';

const $buttonContainer = document.createElement('div');
$buttonContainer.style.height = '200px';
$buttonContainer.style.backgroundColor = 'red';

const $button2Container = document.createElement('div');
$button2Container.style.height = '200px';
$button2Container.style.backgroundColor = 'pink';

const $button3Container = document.createElement('div');
$button3Container.style.height = '200px';
$button3Container.style.backgroundColor = 'green';

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
