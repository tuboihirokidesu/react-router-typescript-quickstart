import AboutPage from '../pages/About';
import HomePage from '../pages/Home';
import { IRoute } from '../type/route';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
    exact: true
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage,
    exact: true
  },
  {
    path: '/about/:number',
    name: 'About Page',
    component: AboutPage,
    exact: true
  },
]

export default routes;