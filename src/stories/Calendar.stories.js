import Calendar from '../components/Calendar';

export default {
  title: 'Components/Calendar',
  render: (args) => {
    const calendar = new Calendar(args);
    const $container = document.createElement('div');
    calendar.mount($container);

    return $container;
  },
};

export const Default = {
  args: {
    day: 1,
    month: 1,
    year: 2024,
  },
};
