import { BrowserRoute } from 'vanilla-routing';
import addPet from './routes/app/add-pet/add-pet';
import mainRoutes from './routes/app/main-routes/main-routes';
import myPets from './routes/app/my-pets/my-pets';
import account from './routes/create-account/account'; //

export default function mainRouter() {
  const routes = [
    ...Object.values(mainRoutes),
    ...Object.values(myPets),
    ...Object.values(addPet),
    ...Object.values(account), //
  ];

  BrowserRoute(routes);
}
