import { BrowserRoute } from 'vanilla-routing';
import cadastroPet from './routes/cadastro-pet/cadastro-pet';
import meusPets from './routes/meus-pets/meus-pets';
import rotasPrincipais from './routes/rotas-principais/rotas-principais';

export default function mainRouter() {
  const routes = [
    ...Object.values(rotasPrincipais),
    ...Object.values(meusPets),
    ...Object.values(cadastroPet),
  ];

  BrowserRoute(routes);
}
