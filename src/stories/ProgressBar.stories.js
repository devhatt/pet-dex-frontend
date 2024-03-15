import ProgressBar from '../components/ProgressBar';

export default {
  title: 'Components/ProgressBar',
  render: (args) => {
    const progressBar = new ProgressBar(args.minimum, args.maximum, args.startValue);
    const $container = document.createElement('div');
    progressBar.mount($container);

    for (let i = progressBar.minimum; i <= progressBar.maximum; i += 1) {
      setTimeout(() => {
        if (progressBar.currentProgress === progressBar.maximum) {
          progressBar.setProgress(progressBar.minimum);
        } else progressBar.next();
      }, 1000 * i);
    }

    return $container;
  },
  argTypes: {
    minimum: { control: 'number', default: 0 },
    maximum: { control: 'number', default: 10 },
    startValue: { control: 'number', default: 0 },
  },
};

export const Default = {
  args: {
    minimum: 0,
    maximum: 10,
    startValue: 0,
  },
};
