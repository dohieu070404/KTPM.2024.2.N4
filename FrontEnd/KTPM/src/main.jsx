import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,
         RouterProvider,
}from "react-router-dom";

import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import HomePage from './pages/home.jsx';
import RegisterPage from './pages/register.jsx';
import AdminPage from './pages/admin/adminpage.jsx';
import CustomerPage from './pages/customer/customerpage.jsx';
import HotelPage from './pages/user/hotelpage.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/home",
    element: <HomePage/>
  },
  {
    path: "/adminpage",
    element: <AdminPage/>
  },
  {
    path: "/CustomerPage",
    element: <CustomerPage/>
  },{
    path: "/HoltelPage",
    element: <HotelPage/>
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
