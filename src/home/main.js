import extractElements from '../utils/extract-elements';
import Storage from '../utils/storage';
import Logged from './components/logged';
import Login from './components/login';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $container = selected.get('container');

  const storageName = 'logged';
  const storage = new Storage(storageName, { name: null });

  const loginComponent = new Login();
  loginComponent.events.login.add((data) => storage.setValue(data));

  const loggedComponent = new Logged();
  loggedComponent.events.logout.add(() => storage.reset());

  storage.events.onChange.add((value) => {
    const isLogged = value.name != null;

    if (isLogged) {
      loggedComponent.setName(value.name);
      $container.append(...loggedComponent.elements);
      loginComponent.elements.forEach((element) => element.remove());
    } else {
      $container.append(...loginComponent.elements);
      loggedComponent.elements.forEach((element) => element.remove());
    }
  });
  storage.setValue(storage.getValue()); // just to trigger update
});
