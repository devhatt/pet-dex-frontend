import Toggle from '../components/Toggle';

export default {
  title: 'Components/Toggle',

  render: (args) => {
    const $container = document.createElement('div');
    const toggle = new Toggle(args);
    toggle.mount($container);
    return $container;
  },
};

export const Default = {};
