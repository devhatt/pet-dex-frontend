import Filter from '../components/Filter';

export default {
  title: 'Components/Filter',
  render: (args) => {
    const filter = new Filter(args);
    const $container = document.createElement('div');
    filter.mount($container);

    return $container;
  },
  argTypes: {
    boldText: { control: 'text', default: '' },
    regularText: { control: 'text', default: '' },
    inputPlaceholder: { control: 'text', default: '' },
  },
};

export const Default = {
  args: {
    boldText: 'Qual é a raça do seu animal de estimação?',
    regularText: 'Deixe-nos saber que tipo e o seu animal de estimação',
    inputPlaceholder: 'Pesquise por uma espécie',
  },

  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile = {
  args: {
    boldText: 'Qual é a raça do seu animal de estimação?',
    regularText: 'Deixe-nos saber que tipo e o seu animal de estimação',
    inputPlaceholder: 'Pesquise por uma espécie',
  },

  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },

};
