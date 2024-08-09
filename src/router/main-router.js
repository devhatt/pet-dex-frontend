import { BrowserRoute } from 'vanilla-routing';
import addPet from './routes/add-pet/add-pet';
import mainRoutes from './routes/main-routes/main-routes';
import myPets from './routes/my-pets/my-pets';

export default function mainRouter() {
  const routes = [
    ...Object.values(mainRoutes),
    ...Object.values(myPets),
    ...Object.values(addPet),
  ];

  BrowserRoute(routes);
}
