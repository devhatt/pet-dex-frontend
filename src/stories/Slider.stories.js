import Slider from '../components/Slider';
import Card from '../components/Card/';

export default {
  title: 'Components/Slider',
  render: (args) => {
    const slider = new Slider(args);
    const $container = document.createElement('div');
    slider.mount($container);

    return $container;
  },
  argTypes: {
    contents: {
      control: {
        type: 'object',
      },
      description: 'Array of objects to be passed to the slider',
      table: {
        type: {
          summary: 'Array<Object>',
        },
      },
    },
  },
};

export const Default = {
  args: {
    contents: [new Card(), new Card(), new Card(), new Card()],
  },
};
