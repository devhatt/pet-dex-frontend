import Button from '../../../components/button';
import Input from '../../../components/input';
import createElements from '../../../utils/create-elements';
import extractElements from '../../../utils/extract-elements';
import html from './index.html?raw';
import './index.scss';

export default function Login() {
  this.elements = createElements(html);
  this.selected = extractElements(this.elements);

  this.input = new Input();
  this.input.setLabel('Username');
  this.input.selected.get('input').setAttribute('required', 'true');

  this.button = new Button();
  this.button.setText('Login');
  this.button.selected
    .get('button')
    .addEventListener('click', (event) => this.submit());

  const $form = this.selected.get('form');
  $form.addEventListener('submit', (event) => this.submit());
  $form.append(...this.input.elements, ...this.button.elements);

  this.events = {
    login: new Set(),
  };
}

Login.prototype = Object.assign(Login.prototype, {
  getData() {
    return {
      name: this.input.getValue(),
    };
  },

  submit() {
    const $form = this.selected.get('form');
    const valid = $form.reportValidity();
    if (!valid) return;

    this.events.login.forEach((callback) => callback(this.getData()));
    $form.reset();
  },
});
