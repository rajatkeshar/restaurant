import { lazy, Suspense } from 'react';
import Home from '../components/Home';
//import About from '../components/About';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Contact from '../components/Contact';
import NotFound from '../components/NotFound';
import Item from '../components/Item';
import Cart from '../components/Cart';

const About = lazy(() => import('../components/About')); //lazy loading

export const navigations = [
    {path: '*',         name: "NotFound",  isMenu: false,  isPrivate: false, element: <NotFound />},
    {path: '/',         name: "Home",      isMenu: true,   isPrivate: false, element: <Home />},
    {path: '/about',    name: "About",     isMenu: true,   isPrivate: false, element: <Suspense fallback={<h3>Loading...</h3>}><About /></Suspense>},
    {path: '/contact',  name: "Contact",   isMenu: true,   isPrivate: false, element: <Contact />},
    {path: '/profile',  name: "Profile",   isMenu: true,   isPrivate: true,  element: <Profile />},
    {path: '/login',    name: "Login",     isMenu: false,  isPrivate: false, element: <Login />},
    {path: '/item/:id', name: "Item",      isMenu: false,  isPrivate: false, element: <Item />},
    {path: '/cart',     name: "Cart",      isMenu: true,   isPrivate: false, element: <Cart />}
];