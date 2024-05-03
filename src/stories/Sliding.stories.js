import Button from '../components/Button';
import Slinding from '../components/Sliding';

const button = new Button({
  text: '1',
  isFullWidth: true,
});

const $buttonContainer = document.createElement('div');
button.mount($buttonContainer);

const button2 = new Button({
  text: '2',
  isFullWidth: true,
});

const $button2Container = document.createElement('div');
button2.mount($button2Container);

const button3 = new Button({
  text: '3',
  isFullWidth: true,
});

const $button3Container = document.createElement('div');
button3.mount($button3Container);

const button4 = new Button({
  text: '1',
  isFullWidth: true,
});

const $button4Container = document.createElement('div');
button4.mount($button4Container);

const button5 = new Button({
  text: '2',
  isFullWidth: true,
});

const $button5Container = document.createElement('div');
button5.mount($button5Container);

const button6 = new Button({
  text: '3',
  isFullWidth: true,
});

const $button6Container = document.createElement('div');
button6.mount($button6Container);

export default {
  title: 'Components/Sliding',
  render: (args) => {
    const sliding = new Slinding(args);
    const $container = document.createElement('div');
    sliding.mount($container);

    return $container;
  },
  argsTypes: {
    items: { control: 'object', defaultValue: [] },
    loopMode: { control: 'text', defaultValue: 'normal' },
    controls: { control: 'boolean', default: true },
  },
};

export const Default = {
  args: {
    items: [$buttonContainer, $button2Container, $button3Container],
    loopMode: 'normal',
    controls: true,
  },
};

export const Infinite = {
  args: {
    items: [$button4Container, $button5Container, $button6Container],
    loopMode: 'infinite',
    controls: true,
  },
};
