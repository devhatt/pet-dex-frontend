import { Component } from 'pet-dex-utilities';
import petUrl from '../../../../images/pet-dex.svg';
import configuracoes from './images/configuracoes.svg';
import conta from './images/conta.svg';
import doacoes from './images/doacoes.svg';
import exit from './images/exit.svg';
import exitMenu from './images/exitmenu.svg';
import meusPets from './images/meuspets.svg';
import notificacoes from './images/notifications.svg';
import perfil from './images/perfil.svg';
import petdex from './images/petdex.svg';
import './index.scss';

const html = `
  <nav class="side-menu-nav">
      <figure class="side-menu-nav__logo-container">
        <img class="side-menu-nav__logo" src="${petUrl}" alt="pet-dex logo" />
      </figure>
      <div class="side-menu-nav__icons">
        <a href="#"><img class="side-menu-nav__notifications" src="${notificacoes}" alt="notificacoes"></a>
        <a href="#"><img class="side-menu-nav__perfil" src="${perfil}" alt="meu perfil"></a>
        <a href="#"><img class="side-menu-nav__exit" src="${exit}" alt="sair"></a>
      </div>
      <img data-select="exitMenu" class="side-menu-nav__exitmenu" src="${exitMenu}" alt="Fechar Menu">
    </nav>
    <div class="side-menu-content">
      <div class="side-menu-content__line"></div>
      <div class="side-menu-content__yourpet">
        <h2 class="side-menu-content__title-yourpet">Seu Pet</h2>
      </div>
      <div class="side-menu-content__line"></div>
      <div class="side-menu-content__itens" alt="itens-um">
        <ul class="side-menu-content__ul" data-select="menuitens">
          <li><a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pets"><img src="${meusPets}" alt="Meus Pets">Meus Pets</a></li>
          <li><a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pet-dex"><img src="${petdex}" alt="Pet Dex">Pet Dex</a></li>
          <li><a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/donates"><img src="${doacoes}" alt="Doacoes">Doações</a></li>
          <hr class="side-menu-content__lineinside"/>
          <li><a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/account"><img src="${conta}" alt="conta">Conta</a></li>
          <li><a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/settings"><img src="${configuracoes}" alt="configuracoes">Configurações</a></li>
        </ul>
      </div>
    </div>
  </nav>
`;

export default function SideMenu() {
  Component.call(this, { html });
}

SideMenu.prototype = Object.assign(SideMenu.prototype, Component.prototype);
