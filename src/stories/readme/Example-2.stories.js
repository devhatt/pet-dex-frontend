import Example from './Example';

export default {
  title: 'Examples/Example v2',

  render: (args) => {
    const $container = document.createElement('div');
    const component = new Example(args);
    component.mount($container);
    return $container;
  },

  /* no argTypes podemos adicionar os nossos controles
  Visite https://storybook.js.org/docs/api/arg-types para a documentação completa dos argTypes */
  argTypes: {
    text: { control: 'text', default: 'Example' },
    size: { control: 'select', options: ['32', '64', '86'] },
    color: { control: 'color', default: '#000' },
  },
};

export const Default = {
  args: {
    size: '64', // Vamos adicionar um tamanho padrão
  },
};

/* Podemos criar multiplas stories
Observe que o nome da variavel será o nome do story */
export const Greeting = {
  args: {
    ...Default.args, // podemos aproveitar propriedades previamente configuradas
    text: 'Hello World',
    color: '#f00',
  },
};
