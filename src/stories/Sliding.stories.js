import Sliding from '../components/Sliding';

export default {
  title: 'Components/Sliding',
  render: (args) => {
    const sliding = new Sliding(args);
    const $container = document.createElement('div');
    window.sliding = sliding;
    sliding.mount($container);

    return $container;
  },
  argsTypes: {},
};

export const Default = {
  args: {},
};
