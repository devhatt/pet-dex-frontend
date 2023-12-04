import Input from '../components/input';
import TODO from '../hooks/todo';
import createElements from '../utils/create-elements';
import extractElements from '../utils/extract-elements';
import Storage from '../utils/storage';
import trashIcon from './assets/trash.svg?raw';
import TODOItem from './components/todo-item';
import './index.scss';

function configureTODOInput($form) {
  const inputComponent = new Input();
  inputComponent.setLabel('Write a TODO item');
  inputComponent.selected.get('input').setAttribute('required', true);
  $form.append(...inputComponent.elements);

  return inputComponent;
}

function createTODOItem(todo, item) {
  const component = new TODOItem();

  component.setText(item.text);
  component.toggle(item.checked);

  component.events.check.add(() => todo.checkByID(item.id));
  component.events.uncheck.add(() => todo.uncheckByID(item.id));

  component.events.text.add((value) => todo.setTextByID(item.id, value));
  component.events.text.add(
    (value) => value.trim() == '' && todo.removeByID(item.id)
  );

  const deleteBtnElements = createElements(trashIcon);
  const deleteBtnSelected = extractElements(deleteBtnElements);
  const $icon = deleteBtnSelected.get('icon');

  $icon.addEventListener('click', () => todo.removeByID(item.id));
  component.selected
    .get('checkbox')
    .insertAdjacentElement('beforebegin', $icon);

  return component;
}

function configureTODOList($list) {
  const componentByItem = new Map();
  const todo = new TODO();

  todo.events.added.add((item) => {
    const component = createTODOItem(todo, item);
    componentByItem.set(item, component);
    $list.append(...component.elements);
  });

  todo.events.removed.add((item) => {
    const component = componentByItem.get(item);
    componentByItem.delete(item);
    component.elements.forEach((element) => element.remove());
  });

  return { todo, componentByItem };
}

function configureTODOStorage(todo) {
  const STORAGE_KEY = 'home-todos';
  const storage = new Storage(STORAGE_KEY, []);

  storage
    .getValue()
    .forEach((item) => todo.create(item.text, item.checked, item.id));

  function onUpdate() {
    storage.setValue(todo.items);
  }

  const events = [
    todo.events.added,
    todo.events.removed,
    todo.events.check,
    todo.events.uncheck,
    todo.events.text,
  ];
  events.forEach((event) => event.add(onUpdate));

  return storage;
}

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $form = selected.get('form');
  const $list = selected.get('list');

  const input = configureTODOInput($form);
  const { todo, componentByItem } = configureTODOList($list);
  const storage = configureTODOStorage(todo);

  $form.addEventListener('submit', () => {
    todo.create(input.getValue(), false);
    $form.reset();
  });
});
