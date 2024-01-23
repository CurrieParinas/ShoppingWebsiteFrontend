import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Allproduct from './pages/AllProduct/Allproduct';
import Search from './pages/Search/Search';
import Checkout from './pages/Checkout/Checkout';
import Signup from './pages/Signup/Signup';
import Orders from './pages/Orders/Orders';
import Verification from './pages/Verification/Verification';
import SellerStatistics from "./pages/SellerStatistics/SellerStatistics";
import EditItems from './pages/EditItem/EditItems';
import AddItems from "./pages/AddItems/AddItems";
import AllUsers from './pages/AllUsers/Allusers';

import './App.scss';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/:id',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/users',
        element: <AllUsers />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/allproducts',
        element: <Allproduct />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/verification',
        element: <Verification />,
      },
      {
        path: '/statistics',
        element:<SellerStatistics />, 
      },
      {
        path: "/edititems/:id",
        element:<EditItems/>,
      }, 
     
      {
          path: "/additems",
          element:<AddItems/>,
      }, 
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
