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
    endpoint: 'https://api.mock.com/v1/breeds',
    options: [
      {
        title: 'Raça',
        type: 'radio',
        values: ['Cachorro', 'Gato', 'Pássaro', 'Peixe'],
      },
      {
        title: 'Porte',
        type: 'radio',
        values: ['Pequeno', 'Médio', 'Grande'],
      },
    ],
  },

  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const DesktopNoTitle = {
  args: {
    inputPlaceholder: 'Pesquise por uma espécie',
    endpoint: 'https://api.mock.com/v1/breeds',
    options: [
      {
        title: 'Raça',
        type: 'checkbox',
        values: ['Cachorro', 'Gato', 'Pássaro', 'Peixe'],
      },
      {
        title: 'Porte',
        type: 'radio',
        values: ['Pequeno', 'Médio', 'Grande'],
      },
    ],
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
    endpoint: 'https://api.mock.com/v1/breeds',
    options: [
      {
        title: 'Raça',
        type: 'radio',
        values: ['Cachorro', 'Gato', 'Pássaro', 'Peixe'],
      },
      {
        title: 'Porte',
        type: 'radio',
        values: ['Pequeno', 'Médio', 'Grande'],
      },
    ],
  },

  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },

};

export const MobileNoTitle = {
  args: {
    inputPlaceholder: 'Pesquise por uma espécie',
    endpoint: 'https://api.mock.com/v1/breeds',
    options: [
      {
        title: 'Raça',
        type: 'checkbox',
        values: ['Cachorro', 'Gato', 'Pássaro', 'Peixe'],
      },
      {
        title: 'Porte',
        type: 'radio',
        values: ['Pequeno', 'Médio', 'Grande'],
      },
    ],
  },

  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
