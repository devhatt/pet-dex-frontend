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
  loginComponent.listen('login', (data) => storage.setValue(data));

  const loggedComponent = new Logged();
  loggedComponent.listen('logout', () => storage.reset());

  storage.events.onChange.add((value) => {
    const isLogged = value.name != null;

    loggedComponent.setName(value.name);
    loggedComponent.toggleMount($container, isLogged);
    loginComponent.toggleMount($container, !isLogged);
  });
  storage.setValue(storage.getValue()); // just to trigger update
});
