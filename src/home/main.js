import { extractElements } from 'pet-dex-utilities';
import './index.scss';
import AvatarButton from '../components/Avatar';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);
  const $container = selected.get('container');
  const avatar = new AvatarButton();
  avatar.mount($container);
});

